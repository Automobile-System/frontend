"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  fetchDemandForecast,
  fetchProfitProjection,
  fetchUnderperformingDepartments,
  fetchSkillShortagePrediction,
  type DemandForecast,
  type ProfitProjection,
  type UnderperformingDepartment,
  type SkillShortagePrediction,
} from "@/services/adminService"

export default function AIInsightsPage() {
  // Individual state for each AI insight section
  const [demandForecast, setDemandForecast] = useState<DemandForecast | null>(null)
  const [profitProjection, setProfitProjection] = useState<ProfitProjection | null>(null)
  const [underperformingDepts, setUnderperformingDepts] = useState<UnderperformingDepartment[]>([])
  const [skillShortages, setSkillShortages] = useState<SkillShortagePrediction[]>([])
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAIInsights = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Load all AI insights in parallel
        const [
          forecast,
          projection,
          departments,
          shortages
        ] = await Promise.all([
          fetchDemandForecast(),
          fetchProfitProjection(),
          fetchUnderperformingDepartments(),
          fetchSkillShortagePrediction()
        ])
        
        setDemandForecast(forecast)
        setProfitProjection(projection)
        setUnderperformingDepts(departments)
        setSkillShortages(shortages)
      } catch (error) {
        console.error('Error loading AI insights:', error)
        setError('Failed to load AI insights. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadAIInsights()
  }, [])

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#020079] mx-auto"></div>
            <p className="mt-4 font-roboto text-[#020079]/70">Loading AI insights...</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (error) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="font-roboto text-[#020079] text-xl font-semibold mb-2">Error</div>
            <p className="font-roboto text-[#020079]/70">{error}</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-white min-h-screen">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bebas text-[#020079] mb-2">
            AI Insights & Forecasting
          </h1>
          <p className="font-roboto text-[#020079]/70">AI-powered predictions and recommendations for business optimization</p>
        </div>

        {/* Demand Forecast Section */}
        {demandForecast && (
          <Card className="mb-6 bg-white border-[#020079]/20">
            <CardHeader className="border-b border-[#020079]/20">
              <CardTitle className="text-xl font-bebas text-[#020079]">
                Next Month Demand Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-white p-5 rounded-lg border-l-4 border-[#020079]">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Overall Demand</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    {demandForecast.overallIncrease}% increase expected in {demandForecast.forecastMonth}. 
                    Total bookings projected at {demandForecast.projectedBookings} services 
                    (+{demandForecast.changeFromPrevious} from {demandForecast.previousMonth}).
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFD700]">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-2">Service Breakdown</p>
                  <div className="grid grid-cols-2 gap-3">
                    {demandForecast.serviceBreakdown.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge 
                          variant="secondary"
                          className={`${
                            service.percentageChange >= 0 
                              ? "bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30" 
                              : "bg-[#020079]/10 text-[#020079]/60 border-[#020079]/20"
                          } font-roboto`}
                        >
                          {service.percentageChange >= 0 ? '+' : ''}{service.percentageChange}%
                        </Badge>
                        <span className="text-sm font-roboto text-[#020079]">{service.serviceName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFD700]">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Hiring Recommendation</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    Add {demandForecast.hiringRecommendation.totalMechanics} mechanics: {demandForecast.hiringRecommendation.breakdown.join(', ')} to meet demand surge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profit Projection Section */}
        {profitProjection && (
          <Card className="mb-6 bg-white border-[#020079]/20">
            <CardHeader className="border-b border-[#020079]/20">
              <CardTitle className="text-xl font-bebas text-[#020079]">
                Profit Projection Curve (Q4 2025)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFD700]">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Current Trajectory</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    {profitProjection.monthOverMonthGrowth}% month-over-month growth maintained. {profitProjection.trajectory.map((month, index) => (
                      <span key={index}>
                        {month.month}: LKR {month.profit}
                        {index < profitProjection.trajectory.length - 1 ? ' → ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-[#020079]">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Year-End Target</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    On track to achieve LKR {profitProjection.yearEndTarget.monthlyProfit} monthly profit by {profitProjection.yearEndTarget.date} ({profitProjection.yearEndTarget.annualGrowth}% annual growth).
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFD700]">
                <div>
                  <p className="font-roboto font-semibold text-[#020079] mb-1">Optimization Tip</p>
                  <p className="text-sm font-roboto text-[#020079]/70">
                    {profitProjection.optimizationTip}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Underperforming Departments Section */}
        {underperformingDepts.length > 0 && (
          <Card className="mb-6 bg-white border-[#020079]/20">
            <CardHeader className="border-b border-[#020079]/20">
              <CardTitle className="text-xl font-bebas text-[#020079]">
                Underperforming Department Warnings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {underperformingDepts.map((dept, index) => (
                <div key={index} className="bg-white p-5 rounded-lg border-l-4 border-[#020079]">
                  <div className="mb-4">
                    <p className="font-roboto font-semibold text-[#020079] mb-2">{dept.departmentName}</p>
                    <p className="text-sm font-roboto text-[#020079]/70 mb-3">
                      {dept.slowerCompletion}% slower completion rate vs. benchmark. Average {dept.avgCompletionTime} mins (target: {dept.targetTime} mins).
                    </p>
                  </div>

                  <div className="bg-[#020079]/5 p-4 rounded-lg mb-3">
                    <p className="font-roboto font-semibold text-[#020079] mb-1 text-sm">
                      Root Cause Analysis
                    </p>
                    <p className="text-sm font-roboto text-[#020079]/70">
                      {dept.rootCause}. Manager {dept.managerOversight.name} oversight quality score: {dept.managerOversight.score}% (below {dept.managerOversight.threshold}% threshold).
                    </p>
                  </div>

                  <div className="bg-[#FFD700]/10 p-4 rounded-lg">
                    <p className="font-roboto font-semibold text-[#020079] mb-1 text-sm">
                      Recommendation
                    </p>
                    <p className="text-sm font-roboto text-[#020079]/70">
                      {dept.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Skill Shortage Predictions Section */}
        {skillShortages.length > 0 && (
          <Card className="mb-6 bg-white border-[#020079]/20">
            <CardHeader className="border-b border-[#020079]/20">
              <CardTitle className="text-xl font-bebas text-[#020079]">
                Skill Shortage Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {skillShortages.map((shortage, index) => (
                <div key={index} className="bg-white p-5 rounded-lg border-l-4 border-[#FFD700]">
                  <div className="mb-4">
                    <p className="font-roboto font-semibold text-[#020079] mb-2">{shortage.skillArea} Crisis</p>
                    <p className="text-sm font-roboto text-[#020079]/70 mb-3">
                      Demand up {shortage.demandIncrease}% but only {shortage.availableEmployees} certified {shortage.skillArea.toLowerCase()} available. 
                      Workforce will be overwhelmed in {shortage.crisisWeeks} weeks.
                    </p>
                  </div>

                  <div className="bg-[#020079]/5 p-4 rounded-lg mb-3">
                    <p className="font-roboto font-semibold text-[#020079] mb-1 text-sm">
                      Impact Forecast
                    </p>
                    <p className="text-sm font-roboto text-[#020079]/70">
                      Without intervention, {shortage.impactForecast.delayedCustomers} customers will face delays in {shortage.impactForecast.month}, 
                      risking LKR {shortage.impactForecast.revenueLoss.toLocaleString()} revenue loss.
                    </p>
                  </div>

                  <div className="bg-[#FFD700]/10 p-4 rounded-lg">
                    <p className="font-roboto font-semibold text-[#020079] mb-2 text-sm">
                      Action Plan
                    </p>
                    <div className="space-y-2">
                      {shortage.actionPlan.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start gap-2">
                          <Badge variant="secondary" className="bg-[#FFD700]/20 text-[#020079] border-[#FFD700]/30 font-roboto mt-0.5">
                            {actionIndex + 1}
                          </Badge>
                          <p className="text-sm font-roboto text-[#020079]/70 flex-1">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
