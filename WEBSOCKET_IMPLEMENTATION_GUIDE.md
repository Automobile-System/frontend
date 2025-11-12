# WebSocket Implementation Guide

## Issues Fixed

### 1. API Request Failures ❌ → ✅
**Problem:** REST API calls were failing because they weren't sending authentication cookies properly.

**Solution:** 
- Added proper cookie handling in server-side fetch calls
- Included `accessToken` cookie in request headers
- Used `credentials: 'include'` for cookie transmission

```typescript
const { cookies } = await import('next/headers')
const cookieStore = await cookies()
const accessToken = cookieStore.get('accessToken')

const response = await fetch(`${BASE_URL}/api/customer/dashboard/overview`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `accessToken=${accessToken.value}`,
  },
  credentials: 'include',
  cache: 'no-store',
})
```

### 2. Removed Real-Time Update Indicator ✅
**Reason:** The green/red "Real-time updates active" badge was misleading because:
- Users don't need to know about technical implementation details
- Connection status doesn't affect user experience (data updates silently)
- Creates unnecessary visual clutter
- Enterprise apps prioritize clean UX over technical indicators

**Removed:**
```tsx
// ❌ Removed this UI element
<div className="flex items-center gap-2">
  {isConnected ? <Wifi size={16} /> : <WifiOff size={16} />}
  <span>{isConnected ? 'Real-time updates active' : 'Connecting...'}</span>
</div>
```

---

## Enterprise Best Practice: How Real-Time Updates Should Work

### ✅ Recommended Approach (What We Implemented)

```
1. Page Load
   ↓
2. Fetch Initial Data via REST API (Server-Side)
   ↓
3. Display Data Immediately (Fast UX)
   ↓
4. Initialize WebSocket Connection (Client-Side)
   ↓
5. WebSocket Updates Data in Background
   ↓
6. UI Updates Smoothly Without User Noticing
```

### Architecture Flow

```typescript
// Step 1 & 2: Server-side data fetching (Next.js Server Component)
export default async function CustomerDashboardContent() {
  // Fetch initial data on the server (fast, SEO-friendly)
  const [dashboardData, serviceFrequency, user] = await Promise.all([
    getDashboardOverview(),      // REST API call
    getServiceFrequency('1year'), // REST API call
    getCurrentUser()              // Get username for WebSocket
  ])

  // Step 3: Pass initial data to client component
  return (
    <StatsCardsWebSocket 
      initialData={dashboardData}  // Display this immediately
      username={username}           // Use for WebSocket connection
    />
  )
}
```

```typescript
// Step 4-6: Client-side WebSocket updates
export default function StatsCardsWebSocket({ initialData, username }) {
  // Step 3: Show initial data immediately
  const [data, setData] = useState(initialData);
  
  // Step 4: Connect to WebSocket in background
  const { dashboardData } = useCustomerDashboard(username);

  // Step 5 & 6: Update UI when WebSocket sends new data
  useEffect(() => {
    if (dashboardData) {
      setData(dashboardData);  // Smooth update
    }
  }, [dashboardData]);

  return <div>{/* Render data */}</div>
}
```

---

## Why This Approach?

### ✅ Advantages

1. **Fast Initial Load**
   - REST API data loads on server (no client-side delay)
   - User sees content immediately (better UX)
   - SEO-friendly (search engines see data)

2. **Reliable Fallback**
   - If WebSocket fails, user still has REST API data
   - Graceful degradation
   - No blank screens or loading states

3. **Seamless Updates**
   - WebSocket updates happen in background
   - No page refresh needed
   - User doesn't notice technical details

4. **Performance**
   - REST API: One request per page load
   - WebSocket: Continuous updates without polling
   - Lower server load than polling

5. **Enterprise Standards**
   - Progressive enhancement
   - Separation of concerns (server vs client)
   - Testable architecture

### ❌ Alternative Approaches (Why We Didn't Use)

#### Option A: WebSocket Only (Bad)
```typescript
// ❌ Don't do this
const { dashboardData, isConnected } = useCustomerDashboard(username);

if (!isConnected) return <Loading />  // User sees loading screen
return <Display data={dashboardData} />
```

**Problems:**
- User waits for WebSocket connection (slow UX)
- No data if WebSocket fails
- Not SEO-friendly
- Single point of failure

#### Option B: REST API Polling (Inefficient)
```typescript
// ❌ Don't do this
useEffect(() => {
  const interval = setInterval(() => {
    fetch('/api/dashboard/overview')  // Poll every 5s
  }, 5000)
}, [])
```

**Problems:**
- Unnecessary server requests
- Wastes bandwidth
- Delayed updates (only every 5s)
- Server load increases with users

---

## WebSocket Implementation Details

### Connection Flow

```
Client                          Server
  |                               |
  |--- SockJS connect ----------->|
  |<-- Connection established ----|
  |                               |
  |--- Subscribe to topic ------->|
  |    /topic/customer/dashboard/:username
  |                               |
  |--- Request initial update --->|
  |    /app/customer/dashboard/request
  |                               |
  |<-- Dashboard data ------------|
  |                               |
  |                               |
  [Background updates continue]
  |                               |
  |<-- New data when available ---|
  |<-- New data when available ---|
```

### Backend WebSocket Configuration

**WebSocketConfig.java**
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");  // Client subscribes here
        config.setApplicationDestinationPrefixes("/app"); // Client sends here
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket")
                .setAllowedOriginPatterns("*")
                .withSockJS();  // Fallback for browsers without WebSocket
    }
}
```

**CustomerDashboardController.java**
```java
@MessageMapping("/customer/dashboard/request")
public void requestDashboardUpdate(String username) {
    // Fetch real-time data
    CustomerDashboardResponse update = 
        customerDashboardWSService.getRealtimeOverview(username);
    
    // Push to subscribed clients
    messagingTemplate.convertAndSend(
        "/topic/customer/dashboard/" + username, 
        update
    );
}
```

### Frontend WebSocket Hook

**useCustomerDashboard.ts**
```typescript
export function useCustomerDashboard(username: string | null) {
  const [dashboardData, setDashboardData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!username) return;

    // Create STOMP client
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_URL}/websocket`),
      
      onConnect: () => {
        setIsConnected(true);
        
        // Subscribe to personal topic
        client.subscribe(
          `/topic/customer/dashboard/${username}`,
          (message) => {
            const data = JSON.parse(message.body);
            setDashboardData(data);  // Update state
          }
        );

        // Request initial data
        client.publish({
          destination: '/app/customer/dashboard/request',
          body: username
        });
      },
      
      reconnectDelay: 5000,  // Auto-reconnect
    });

    client.activate();

    return () => client.deactivate();
  }, [username]);

  return { dashboardData, isConnected };
}
```

---

## Testing the Implementation

### 1. Test REST API (Should Work)
```bash
# Get access token from browser cookies
curl -X GET "http://localhost:8080/api/customer/dashboard/overview" \
  -H "Cookie: accessToken=YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

**Expected Response:**
```json
{
  "activeServices": 3,
  "completedServices": 12,
  "upcomingAppointments": 2,
  "activeProjects": 1,
  "completedProjects": 4
}
```

### 2. Test WebSocket Connection (Browser Console)
Open browser DevTools → Console:

```javascript
// You should see:
✅ WebSocket Connected for user: customer@example.com
📊 Dashboard update received: {...}
```

### 3. Test Real-Time Updates
1. Open dashboard in browser
2. Open another tab → Login as manager
3. Create new service for the customer
4. Check customer dashboard → Should update automatically

---

## Troubleshooting

### Issue: "No access token found"
**Cause:** User not logged in or token expired
**Solution:** Redirect to login page

### Issue: "Failed to fetch dashboard overview: 401"
**Cause:** Token invalid or expired
**Solution:** Refresh token or re-login

### Issue: WebSocket not connecting
**Cause:** Backend not running or CORS issue
**Solution:** 
- Check backend is running on port 8080
- Verify WebSocketConfig allows origin patterns

### Issue: Data not updating in real-time
**Cause:** WebSocket connected but not receiving updates
**Debug:**
```typescript
// Add logging in useCustomerDashboard
onConnect: () => {
  console.log('✅ Connected');
  // Check if subscription works
  client.subscribe('/topic/customer/dashboard/' + username, (msg) => {
    console.log('📩 Received:', msg.body);
  });
}
```

---

## Security Considerations

### Current Implementation (Development)
- ✅ REST API requires JWT authentication
- ⚠️ WebSocket accepts any connection (no auth)
- ⚠️ CORS allows all origins (`*`)

### Production Requirements
1. **WebSocket Authentication**
   ```java
   // Add JWT validation to WebSocket connections
   registry.addEndpoint("/websocket")
       .setAllowedOriginPatterns("https://yourdomain.com")
       .addInterceptors(new JwtWebSocketHandshakeInterceptor())
       .withSockJS();
   ```

2. **Topic Authorization**
   ```java
   // Prevent users from subscribing to other users' topics
   @MessageMapping("/customer/dashboard/request")
   public void requestDashboard(String username, Principal principal) {
       if (!principal.getName().equals(username)) {
           throw new AccessDeniedException("Unauthorized");
       }
       // ... rest of code
   }
   ```

3. **Rate Limiting**
   - Limit WebSocket requests per user
   - Prevent DoS attacks

---

## Performance Optimization

### Current Setup
- ✅ Server-side initial render (fast)
- ✅ WebSocket auto-reconnect
- ✅ Clean disconnection on unmount

### Future Enhancements
1. **Caching**
   ```typescript
   // Cache dashboard data in localStorage
   const cachedData = localStorage.getItem('dashboard-cache');
   const [data, setData] = useState(cachedData || initialData);
   ```

2. **Debouncing**
   ```typescript
   // Debounce rapid updates
   const debouncedUpdate = debounce((newData) => {
     setData(newData);
   }, 300);
   ```

3. **Lazy Connection**
   ```typescript
   // Only connect WebSocket when user is active
   const [isTabVisible, setIsTabVisible] = useState(true);
   
   useEffect(() => {
     if (isTabVisible) connect();
     else disconnect();
   }, [isTabVisible]);
   ```

---

## Summary

### What Changed
1. ✅ Fixed REST API authentication (added cookies)
2. ✅ Removed real-time update indicator (cleaner UX)
3. ✅ Implemented enterprise best practice (REST first, WebSocket second)
4. ✅ Improved error handling and logging

### How It Works Now
1. **Page loads** → REST API fetches initial data (server-side)
2. **Data displays** → User sees content immediately
3. **WebSocket connects** → Background connection established
4. **Updates arrive** → UI updates smoothly without user noticing

### Benefits
- ⚡ Fast initial load
- 🔄 Real-time updates
- 🛡️ Graceful fallback
- 🎯 Clean user experience
- 📱 SEO-friendly
- 🏢 Enterprise-grade architecture
