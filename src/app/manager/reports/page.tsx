"use client";

import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  dataList: ApiDataItem[] | null;
  averageDelayDays: number | null;
  mostCommonReason: string | null;
  type: string;
}

interface ApiDataItem {
  name: string | null;
  requests: number | null;
  month: string | null;
  delays: number | null;
  type: string | null;
  value: number | null;
}

interface EmployeeEfficiency {
  name: string;
  efficiency: number;
}

interface RequestedEmployee {
  name: string;
  requests: number;
}

interface DelayDataPoint {
  month: string;
  delays: number;
}

interface PartsDelay {
  delayData: DelayDataPoint[];
  averageDelay: number;
  mostCommon: {
    part: string;
    cases: number;
  };
}

interface ProjectType {
  type: string;
  count: number;
  percentage: number;
}

interface ProjectTypes {
  breakdown: ProjectType[];
  totalProjects: number;
}

type EmployeeEfficiencyResponse = ApiResponse<Record<string, number>>;
type RequestedEmployeeResponse = ApiResponse<null>;
type PartsDelayResponse = ApiResponse<null>;
type ProjectTypesResponse = ApiResponse<null>;

import { 
  getEmployeeEfficiency, 
  getMostRequestedEmployees, 
  getPartsDelayAnalytics, 
  getCompletedProjectsByType 
} from '@/services/api';
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employeeEfficiency, setEmployeeEfficiency] = useState<EmployeeEfficiency[]>([]);
  const [mostRequested, setMostRequested] = useState<RequestedEmployee[]>([]);
  const [partsDelay, setPartsDelay] = useState<PartsDelay>({ 
    delayData: [],
    averageDelay: 0,
    mostCommon: { part: "", cases: 0 }
  });
  const [projectTypes, setProjectTypes] = useState<ProjectTypes>({
    breakdown: [],
    totalProjects: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const [efficiencyData, requestedData, delayData, projectData] = await Promise.all([
          getEmployeeEfficiency(),
          getMostRequestedEmployees(),
          getPartsDelayAnalytics(),
          getCompletedProjectsByType()
        ]);
        
        console.log('API Response:', {
          efficiencyData,
          requestedData,
          delayData,
          projectData
        });

        // Transform employee efficiency data
        const effData = efficiencyData as EmployeeEfficiencyResponse;
        if (effData?.data && typeof effData.data === 'object') {
          const efficiencyArray = Object.entries(effData.data).map(([name, efficiency]) => ({
            name,
            efficiency: Number(efficiency)
          }));
          setEmployeeEfficiency(efficiencyArray);
        } else {
          console.error("Employee efficiency data is not in the expected format:", efficiencyData);
          setEmployeeEfficiency([]);
        }

        // Transform most requested employees data
        const reqData = requestedData as RequestedEmployeeResponse;
        if (reqData?.dataList && Array.isArray(reqData.dataList)) {
          const requestedArray = reqData.dataList
            .filter((item: ApiDataItem) => item.name && item.requests !== null)
            .map((item: ApiDataItem) => ({
              name: item.name!,
              requests: item.requests!
            }));
          setMostRequested(requestedArray);
        } else {
          console.error("Most requested employees data is not in the expected format:", requestedData);
          setMostRequested([]);
        }

        // Transform parts delay analytics data
        const delayDataTyped = delayData as PartsDelayResponse;
        if (delayDataTyped?.dataList && Array.isArray(delayDataTyped.dataList)) {
          const delayPoints = delayDataTyped.dataList
            .filter((item: ApiDataItem) => item.month && item.delays !== null)
            .map((item: ApiDataItem) => ({
              month: item.month!,
              delays: item.delays!
            }));

          // Parse most common reason
          const reasonMatch = delayDataTyped.mostCommonReason?.match(/(.+?)\s*\((\d+)\s*cases?\)/);
          
          setPartsDelay({
            delayData: delayPoints,
            averageDelay: delayDataTyped.averageDelayDays || 0,
            mostCommon: {
              part: reasonMatch ? reasonMatch[1].trim() : delayDataTyped.mostCommonReason || "",
              cases: reasonMatch ? parseInt(reasonMatch[2]) : 0
            }
          });
        } else {
          console.error("Parts delay data is not in the expected format:", delayData);
        }

        // Transform completed projects by type data
        const projData = projectData as ProjectTypesResponse;
        if (projData?.dataList && Array.isArray(projData.dataList)) {
          const validData = projData.dataList.filter(
            (item: ApiDataItem) => item.type && item.value !== null
          );
          
          const totalCount = validData.reduce((sum: number, item: ApiDataItem) => sum + (item.value || 0), 0);
          
          const breakdown = validData.map((item: ApiDataItem) => ({
            type: item.type!,
            count: item.value!,
            percentage: totalCount > 0 ? Math.round((item.value! / totalCount) * 100) : 0
          }));

          setProjectTypes({
            breakdown,
            totalProjects: totalCount
          });
        } else {
          console.error("Project type data is not in the expected format:", projectData);
          setProjectTypes({
            breakdown: [],
            totalProjects: 0
          });
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        setError("Failed to load reports data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateLineChartPath = () => {
    if (!partsDelay.delayData || partsDelay.delayData.length === 0) return "";
    
    const width = 300;
    const height = 100;
    const maxDelay = Math.max(...partsDelay.delayData.map(d => d.delays), 10);
    const stepX = width / (partsDelay.delayData.length - 1 || 1);
    
    return partsDelay.delayData.map((point, index) => {
      const x = index * stepX;
      const y = height - (point.delays / maxDelay) * (height - 20);
      return `${x},${y}`;
    }).join(' ');
  };

  const generateDonutSegments = () => {
    if (!projectTypes.breakdown || projectTypes.breakdown.length === 0) return [];
    
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;
    const colors = ['#020079', '#03009B', '#FFD700', '#E6C200', '#020079'];
    
    return projectTypes.breakdown.map((project, index) => {
      const percentage = project.percentage / 100;
      const dashLength = percentage * circumference;
      const segment = {
        type: project.type,
        count: project.count,
        percentage: project.percentage,
        dashArray: `${dashLength} ${circumference}`,
        dashOffset: -currentOffset,
        color: colors[index % colors.length],
        opacity: project.type === 'Other' ? 0.4 : 1
      };
      currentOffset += dashLength;
      return segment;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          REPORTS & ANALYTICS
        </h1>
        <p className="font-roboto text-[#020079]/60">Monitor employee performance and project analytics</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Employee Efficiency Graph */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">EMPLOYEE EFFICIENCY GRAPH</h2>
          </div>
          
          <div className="bg-[#020079]/5 h-80 rounded-lg flex flex-col items-center justify-center p-6">
            <p className="text-[#020079]/40 font-roboto mb-6">Bar Chart Visualization</p>
            <div className="w-full h-56 flex items-end justify-center gap-8 px-4">
              {Array.isArray(employeeEfficiency) && employeeEfficiency.length > 0 ? (
                employeeEfficiency.map((employee, index) => {
                  const colors = ['bg-[#020079]', 'bg-[#03009B]', 'bg-[#FFD700]', 'bg-[#020079]/70', 'bg-[#E6C200]'];
                  const height = Math.max(50, Math.min(200, employee.efficiency * 2));
                  const isYellow = colors[index % colors.length].includes('FFD700') || colors[index % colors.length].includes('E6C200');
                  const textColor = isYellow ? 'text-[#020079]' : 'text-white';
                  
                  return (
                    <div key={employee.name} className="flex flex-col items-center gap-2">
                      <div 
                        className={`w-16 ${colors[index % colors.length]} rounded-t flex items-end justify-center pb-2`}
                        style={{ height: `${height}px` }}
                      >
                        <span className={`${textColor} text-xs font-semibold font-roboto`}>
                          {employee.efficiency}%
                        </span>
                      </div>
                      <span className="text-sm text-[#020079] font-roboto font-medium">
                        {employee.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="text-[#020079]/60 font-roboto">
                  No efficiency data available
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-[#020079]/60 font-roboto text-center mt-4">
            {Array.isArray(employeeEfficiency) && employeeEfficiency.length > 0 
              ? employeeEfficiency.map(emp => `${emp.name}: ${emp.efficiency}%`).join(' | ')
              : 'No data available'}
          </p>
        </div>

        {/* Most Requested Employees */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">MOST REQUESTED EMPLOYEES</h2>
          </div>
          
          <div className="bg-[#020079]/5 h-64 rounded-lg flex items-center justify-center mb-4">
            <div className="w-full px-8">
              <p className="text-[#020079]/40 font-roboto text-center mb-4">Horizontal Bar Chart</p>
              <div className="space-y-4">
                {Array.isArray(mostRequested) && mostRequested.length > 0 ? (
                  mostRequested.slice(0, 3).map((employee, index) => {
                    const colors = ['bg-[#020079]', 'bg-[#FFD700]', 'bg-[#03009B]'];
                    const maxRequests = Math.max(...mostRequested.map(e => e.requests));
                    const width = (employee.requests / maxRequests) * 100;
                    
                    return (
                      <div key={employee.name}>
                        <div className="flex justify-between text-sm mb-1 font-roboto">
                          <span className="text-[#020079] font-medium">{employee.name}</span>
                          <span className="text-[#020079]/60">{employee.requests} requests</span>
                        </div>
                        <div className="bg-[#020079]/10 h-6 rounded-full overflow-hidden">
                          <div 
                            className={`${colors[index % colors.length]} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-[#020079]/60 font-roboto text-center">
                    No request data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Parts Delay Analytics */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">PARTS DELAY ANALYTICS</h2>
          </div>
          
          <div className="bg-[#020079]/5 h-64 rounded-lg flex items-center justify-center mb-4 p-4">
            {partsDelay.delayData && partsDelay.delayData.length > 0 ? (
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#020079" strokeWidth="1" opacity="0.2" />
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#020079" strokeWidth="1" opacity="0.1" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#020079" strokeWidth="1" opacity="0.1" />
                    <line x1="0" y1="25" x2="300" y2="25" stroke="#020079" strokeWidth="1" opacity="0.1" />
                    
                    {/* Line chart */}
                    <polyline
                      points={generateLineChartPath()}
                      fill="none"
                      stroke="#020079"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data points */}
                    {partsDelay.delayData.map((point, index) => {
                      const width = 300;
                      const height = 100;
                      const maxDelay = Math.max(...partsDelay.delayData.map(d => d.delays), 10);
                      const stepX = width / (partsDelay.delayData.length - 1 || 1);
                      const x = index * stepX;
                      const y = height - (point.delays / maxDelay) * (height - 20);
                      
                      return (
                        <g key={index}>
                          <circle cx={x} cy={y} r="5" fill="#020079" />
                          <text 
                            x={x} 
                            y={y - 10} 
                            textAnchor="middle" 
                            fill="#020079" 
                            fontSize="10" 
                            fontWeight="bold"
                          >
                            {point.delays}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Month labels */}
                    {partsDelay.delayData.map((point, index) => {
                      const width = 300;
                      const stepX = width / (partsDelay.delayData.length - 1 || 1);
                      const x = index * stepX;
                      
                      return (
                        <text 
                          key={`label-${index}`}
                          x={x} 
                          y={115} 
                          textAnchor="middle" 
                          fill="#020079" 
                          fontSize="11" 
                          fontWeight="500"
                        >
                          {point.month}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[#020079]/40 font-roboto">No delay data available</p>
              </div>
            )}
          </div>
          
          <p className="text-sm text-[#020079]/60 font-roboto text-center">
            {partsDelay.averageDelay > 0 || partsDelay.mostCommon.part 
              ? `Average delay: ${partsDelay.averageDelay} days | Most common: ${partsDelay.mostCommon.part} (${partsDelay.mostCommon.cases} cases)`
              : 'No delay data available'}
          </p>
        </div>

        {/* Completed Projects by Type */}
        <div className="bg-white rounded-lg border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4 border-b-2 border-[#020079]/10 pb-3">
            <h2 className="text-xl font-bebas text-[#020079] tracking-wide">COMPLETED PROJECTS BY TYPE</h2>
          </div>
          
          <div className="bg-[#020079]/5 h-64 rounded-lg flex items-center justify-center mb-4">
            {projectTypes.breakdown && projectTypes.breakdown.length > 0 ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {generateDonutSegments().map((segment, index) => (
                      <circle
                        key={index}
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="20"
                        strokeDasharray={segment.dashArray}
                        strokeDashoffset={segment.dashOffset}
                        opacity={segment.opacity}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bebas text-[#020079]">{projectTypes.totalProjects}</p>
                      <p className="text-xs text-[#020079]/60 font-roboto">Total Projects</p>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="ml-6 space-y-2">
                  {projectTypes.breakdown.map((project, index) => {
                    const colors = ['#020079', '#03009B', '#FFD700', '#E6C200', '#020079'];
                    return (
                      <div key={project.type} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ 
                            backgroundColor: colors[index % colors.length],
                            opacity: project.type === 'Other' ? 0.4 : 1
                          }}
                        />
                        <span className="text-sm font-roboto text-[#020079]">
                          {project.type}: <span className="font-semibold">{project.count}</span> ({project.percentage}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-[#020079]/40 font-roboto">No project data available</p>
              </div>
            )}
          </div>
          
          <p className="text-sm text-[#020079]/60 font-roboto text-center">
            {projectTypes.breakdown && projectTypes.breakdown.length > 0
              ? projectTypes.breakdown
                  .map(p => `${p.type}: ${p.percentage}%`)
                  .join(' | ')
              : 'No project breakdown data'}
          </p>
        </div>
      </div>
    </div>
  );
}