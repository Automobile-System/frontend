"use client"

import { useEffect, useState } from "react"
import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  Target,
  Wrench,
  Brain,
  Activity,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading AI insights...</p>
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
            <AlertCircle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <div className="text-rose-600 text-xl font-semibold mb-2">Error</div>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-8 bg-gradient-to-br from-slate-50 to-purple-50 min-h-screen">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-slate-800">
              AI Insights & Forecasting
            </h1>
          </div>
          <p className="text-slate-600">AI-powered predictions and recommendations for business optimization</p>
        </div>

        {/* Demand Forecast Section */}
        {demandForecast && (
          <Card className="mb-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Next Month Demand Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border-l-4 border-purple-400">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Overall Demand</p>
                    <p className="text-sm text-slate-600">
                      {demandForecast.overallIncrease}% increase expected in {demandForecast.forecastMonth}. 
                      Total bookings projected at {demandForecast.projectedBookings} services 
                      (+{demandForecast.changeFromPrevious} from {demandForecast.previousMonth}).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-2">Service Breakdown</p>
                    <div className="grid grid-cols-2 gap-3">
                      {demandForecast.serviceBreakdown.map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge 
                            variant="secondary"
                            className={`${
                              service.percentageChange >= 0 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {service.percentageChange >= 0 ? '+' : ''}{service.percentageChange}%
                          </Badge>
                          <span className="text-sm text-slate-700">{service.serviceName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-lg border-l-4 border-teal-400">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Hiring Recommendation</p>
                    <p className="text-sm text-slate-600">
                      Add {demandForecast.hiringRecommendation.totalMechanics} mechanics: {demandForecast.hiringRecommendation.breakdown.join(', ')} to meet demand surge.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profit Projection Section */}
        {profitProjection && (
          <Card className="mb-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Profit Projection Curve (Q4 2025)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Current Trajectory</p>
                    <p className="text-sm text-slate-600">
                      {profitProjection.monthOverMonthGrowth}% month-over-month growth maintained. {profitProjection.trajectory.map((month, index) => (
                        <span key={index}>
                          {month.month}: LKR {month.profit}
                          {index < profitProjection.trajectory.length - 1 ? ' → ' : ''}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border-l-4 border-indigo-400">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Year-End Target</p>
                    <p className="text-sm text-slate-600">
                      On track to achieve LKR {profitProjection.yearEndTarget.monthlyProfit} monthly profit by {profitProjection.yearEndTarget.date} ({profitProjection.yearEndTarget.annualGrowth}% annual growth).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-lg border-l-4 border-amber-400">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 mb-1">Optimization Tip</p>
                    <p className="text-sm text-slate-600">
                      {profitProjection.optimizationTip}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Underperforming Departments Section */}
        {underperformingDepts.length > 0 && (
          <Card className="mb-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-orange-50 border-b border-rose-100">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Underperforming Department Warnings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {underperformingDepts.map((dept, index) => (
                <div key={index} className="bg-gradient-to-r from-rose-50 to-orange-50 p-5 rounded-lg border-l-4 border-rose-400">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <p className="font-semibold text-slate-800">{dept.departmentName}</p>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {dept.slowerCompletion}% slower completion rate vs. benchmark. Average {dept.avgCompletionTime} mins (target: {dept.targetTime} mins).
                    </p>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg mb-3">
                    <p className="font-semibold text-slate-800 mb-1 text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4 text-slate-600" />
                      Root Cause Analysis
                    </p>
                    <p className="text-sm text-slate-600">
                      {dept.rootCause}. Manager {dept.managerOversight.name} oversight quality score: {dept.managerOversight.score}% (below {dept.managerOversight.threshold}% threshold).
                    </p>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="font-semibold text-slate-800 mb-1 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      Recommendation
                    </p>
                    <p className="text-sm text-slate-600">
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
          <Card className="mb-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
              <CardTitle className="text-xl text-slate-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Skill Shortage Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {skillShortages.map((shortage, index) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-5 rounded-lg border-l-4 border-orange-400">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <p className="font-semibold text-slate-800">{shortage.skillArea} Crisis</p>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      Demand up {shortage.demandIncrease}% but only {shortage.availableEmployees} certified {shortage.skillArea.toLowerCase()} available. 
                      Workforce will be overwhelmed in {shortage.crisisWeeks} weeks.
                    </p>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg mb-3">
                    <p className="font-semibold text-slate-800 mb-1 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Impact Forecast
                    </p>
                    <p className="text-sm text-slate-600">
                      Without intervention, {shortage.impactForecast.delayedCustomers} customers will face delays in {shortage.impactForecast.month}, 
                      risking LKR {shortage.impactForecast.revenueLoss.toLocaleString()} revenue loss.
                    </p>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="font-semibold text-slate-800 mb-2 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Action Plan
                    </p>
                    <div className="space-y-2">
                      {shortage.actionPlan.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start gap-2">
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 mt-0.5">
                            {actionIndex + 1}
                          </Badge>
                          <p className="text-sm text-slate-600 flex-1">{action}</p>
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
