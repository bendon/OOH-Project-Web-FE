import React from 'react';
import {
  Zap,
  CheckCircle,
  BarChart2,
  FileText,
  Server,
  ArrowRight,
  Clock,
  Shield,
  PieChart,
  Award
} from 'lucide-react';

// Typography system:
// - Primary Font (Google Sans Text) is used for headings, navigation, buttons, and UI elements.
// - Secondary Font (Roboto) is used for longer form body text and secondary info.
const typography = {
  container: {
    fontFamily: "'Roboto', sans-serif",
  },
  logo: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 700,
    fontSize: '20px',
  },
  navLink: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.5',
  },
  primaryButton: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.5',
  },
  secondaryButton: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.5',
  },
  uiText: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.5',
  },
  heroHeadline: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '1.2',
  },
  heroSubheadline: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '1.5',
  },
  sectionHeadline: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 700,
    fontSize: '30px',
    lineHeight: '1.2',
  },
  subSectionHeadline: {
    fontFamily: "'Google Sans Text', sans-serif",
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '1.3',
  },
  bodyText: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '1.6',
  },
  smallText: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 300,
    fontSize: '14px',
    lineHeight: '1.6',
  },
};

const PowerProjectLanding = () => {
  return (
    <div style={typography.container}>
      {/* Header Navigation */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <Zap className="h-8 w-8 text-blue-600" />
              <span style={typography.logo} className="ml-2 text-gray-800">
                PowerTrack
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" style={typography.navLink} className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#scada" style={typography.navLink} className="text-gray-600 hover:text-blue-600">
                SCADA Module
              </a>
              <a href="#process" style={typography.navLink} className="text-gray-600 hover:text-blue-600">
                Workflow
              </a>
              <a href="#results" style={typography.navLink} className="text-gray-600 hover:text-blue-600">
                Results
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button style={typography.uiText} className="text-blue-600 hover:text-blue-800">
              Log In
            </button>
            <button style={typography.primaryButton} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Request Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-10 md:mt-0 md:pr-10">
              <h1 style={typography.heroHeadline} className="text-gray-900 leading-tight">
                The Complete Power Generation Management Platform
              </h1>
              <p style={typography.heroSubheadline} className="mt-4 text-gray-600">
                Streamline development, compliance, and operations with an integrated tracking system built for power developers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button style={typography.primaryButton} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">
                  Start Free Trial
                </button>
                <button style={typography.secondaryButton} className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded">
                  Schedule Demo
                </button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  <div className="h-10 w-10 rounded-full border border-white bg-blue-600 flex items-center justify-center text-white">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white bg-green-600 flex items-center justify-center text-white">
                    <Server className="h-5 w-5" />
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white bg-purple-600 flex items-center justify-center text-white">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                </div>
                <p style={typography.smallText} className="ml-4 text-gray-600">
                  Trusted by power developers in over 30 countries
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded border">
                <div className="flex justify-between items-center mb-4">
                  <h3 style={typography.subSectionHeadline} className="text-gray-800">
                    Project Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded border">
                    <div style={typography.smallText} className="text-xs text-gray-500 mb-1">
                      Progress
                    </div>
                    <div style={typography.subSectionHeadline} className="text-xl text-gray-800">
                      68%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div style={typography.smallText} className="text-xs text-gray-500 mb-1">
                      Budget
                    </div>
                    <div style={typography.subSectionHeadline} className="text-xl text-gray-800">
                      $2.4M
                    </div>
                    <div style={typography.smallText} className="text-xs text-green-600 mt-2">
                      Under budget
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border">
                    <div style={typography.smallText} className="text-xs text-gray-500 mb-1">
                      Timeline
                    </div>
                    <div style={typography.subSectionHeadline} className="text-xl text-gray-800">
                      On track
                    </div>
                    <div style={typography.smallText} className="text-xs text-purple-600 mt-2">
                      Next: Apr 15
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 style={typography.uiText} className="text-gray-700">
                      Project Milestones
                    </h4>
                    <span style={typography.smallText} className="text-xs text-gray-500">
                      3 of 5 completed
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                      <span style={typography.smallText} className="text-sm text-gray-700">
                        Project Setup
                      </span>
                      <span style={typography.smallText} className="ml-auto text-xs text-gray-500">
                        100%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                      <span style={typography.smallText} className="text-sm text-gray-700">
                        Permitting & Compliance
                      </span>
                      <span style={typography.smallText} className="ml-auto text-xs text-gray-500">
                        100%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                      <span style={typography.smallText} className="text-sm text-gray-700">
                        Financial Tracking
                      </span>
                      <span style={typography.smallText} className="ml-auto text-xs text-gray-500">
                        100%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                      <span style={typography.smallText} className="text-sm text-gray-700">
                        Construction Monitoring
                      </span>
                      <span style={typography.smallText} className="ml-auto text-xs text-gray-500">
                        68%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-gray-300 mr-2"></div>
                      <span style={typography.smallText} className="text-sm text-gray-700">
                        Commissioning & Operations
                      </span>
                      <span style={typography.smallText} className="ml-auto text-xs text-gray-500">
                        0%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div style={typography.smallText} className="text-sm text-gray-600">
                      5 tasks completed today
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600" style={typography.uiText}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={typography.sectionHeadline} className="text-gray-900">
              Streamlined Power Project Management
            </h2>
            <p style={typography.heroSubheadline} className="mt-4 text-gray-600 max-w-3xl mx-auto">
              A comprehensive solution for every aspect of your power generation projects
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow-sm hover:shadow transition-shadow border">
              <div className="h-12 w-12 bg-blue-100 rounded flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2">
                Streamlined Workflows
              </h3>
              <p style={typography.bodyText} className="text-gray-600">
                Manage the entire project lifecycle from feasibility studies to operational monitoring in a single platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-sm hover:shadow transition-shadow border">
              <div className="h-12 w-12 bg-green-100 rounded flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2">
                Compliance Mastery
              </h3>
              <p style={typography.bodyText} className="text-gray-600">
                Stay ahead of regulatory requirements with built-in compliance tracking and automated documentation.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-sm hover:shadow transition-shadow border">
              <div className="h-12 w-12 bg-purple-100 rounded flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2">
                Real-Time Monitoring
              </h3>
              <p style={typography.bodyText} className="text-gray-600">
                Monitor all critical project metrics from a unified dashboard with customizable views and alerts.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-sm hover:shadow transition-shadow border">
              <div className="h-12 w-12 bg-orange-100 rounded flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2">
                Comprehensive Reporting
              </h3>
              <p style={typography.bodyText} className="text-gray-600">
                Generate stakeholder-ready reports with a single click, customized for different audiences and requirements.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-sm hover:shadow transition-shadow border">
              <div className="h-12 w-12 bg-indigo-100 rounded flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2">
                SCADA Integration
              </h3>
              <p style={typography.bodyText} className="text-gray-600">
                Connect directly to operational assets for real-time performance data, analytics, and predictive maintenance.
              </p>
            </div>
            <div className="bg-blue-600 p-6 rounded shadow-sm hover:shadow transition-shadow">
              <div className="h-12 w-12 bg-white rounded flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-white mb-2">
                Ready to get started?
              </h3>
              <p style={typography.bodyText} className="text-blue-100 mb-4">
                Discover how our platform can transform your power generation projects.
              </p>
              <button style={typography.primaryButton} className="mt-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SCADA Module Section */}
      <section id="scada" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h2 style={typography.sectionHeadline} className="text-gray-900 mb-6">
                Advanced SCADA Integration
              </h2>
              <p style={typography.heroSubheadline} className="text-gray-600 mb-6">
                Connect your operational assets directly to your management platform for unprecedented visibility and control.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 style={typography.subSectionHeadline} className="text-gray-900">
                      Real-time Performance Monitoring
                    </h3>
                    <p style={typography.bodyText} className="mt-1 text-gray-600">
                      View and analyze operational data from all your assets in real-time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 style={typography.subSectionHeadline} className="text-gray-900">
                      Predictive Maintenance
                    </h3>
                    <p style={typography.bodyText} className="mt-1 text-gray-600">
                      Identify potential issues before they cause downtime using advanced analytics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 style={typography.subSectionHeadline} className="text-gray-900">
                      Automated Alerts
                    </h3>
                    <p style={typography.bodyText} className="mt-1 text-gray-600">
                      Receive notifications when parameters exceed thresholds or anomalies are detected.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 style={typography.subSectionHeadline} className="text-gray-900">
                      Historical Performance Analysis
                    </h3>
                    <p style={typography.bodyText} className="mt-1 text-gray-600">
                      Track trends and optimize operations with comprehensive historical data.
                    </p>
                  </div>
                </div>
              </div>
              <button style={typography.primaryButton} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded flex items-center">
                Learn More About SCADA Integration
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="bg-gray-900 p-6 rounded border">
                <div className="flex justify-between items-center mb-6">
                  <h3 style={typography.subSectionHeadline} className="text-gray-100">
                    SCADA Monitoring Dashboard
                  </h3>
                  <div className="flex space-x-3">
                    <div className="h-2 w-2 bg-green-500 rounded animate-pulse"></div>
                    <span style={typography.smallText} className="text-xs text-green-400">
                      Live Data
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span style={typography.smallText} className="text-gray-400 text-sm">
                        Power Output
                      </span>
                      <div className="h-6 w-6 rounded-full bg-blue-900 flex items-center justify-center">
                        <Zap className="h-3 w-3 text-blue-400" />
                      </div>
                    </div>
                    <div style={typography.subSectionHeadline} className="text-2xl text-white">
                      24.7 MW
                    </div>
                    <div style={typography.smallText} className="text-xs text-green-400 mt-1">
                      +2.3% from yesterday
                    </div>
                    <div className="mt-3 flex items-end space-x-1 h-10">
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '40%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '60%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '50%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '80%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '70%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '85%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '75%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '85%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '95%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                      <div className="w-1/12 bg-blue-500 rounded-t" style={{ height: '90%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span style={typography.smallText} className="text-gray-400 text-sm">
                        System Efficiency
                      </span>
                      <div className="h-6 w-6 rounded-full bg-green-900 flex items-center justify-center">
                        <PieChart className="h-3 w-3 text-green-400" />
                      </div>
                    </div>
                    <div style={typography.subSectionHeadline} className="text-2xl text-white">
                      92.3%
                    </div>
                    <div style={typography.smallText} className="text-xs text-green-400 mt-1">
                      Optimal performance
                    </div>
                    <div className="mt-3 h-10 w-full bg-gray-700 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 via-green-500 to-green-500 rounded-full"
                        style={{ width: '92.3%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span style={typography.smallText} className="text-gray-300">
                      Component Status
                    </span>
                    <span style={typography.smallText} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      All Systems Operational
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                        <span style={typography.smallText} className="text-gray-300 text-sm">
                          Turbine Generator 1
                        </span>
                      </div>
                      <span style={typography.smallText} className="text-xs text-gray-400">
                        Normal
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                        <span style={typography.smallText} className="text-gray-300 text-sm">
                          Cooling System
                        </span>
                      </div>
                      <span style={typography.smallText} className="text-xs text-gray-400">
                        Normal
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span style={typography.smallText} className="text-gray-300 text-sm">
                          Distribution Network
                        </span>
                      </div>
                      <span style={typography.smallText} className="text-xs text-yellow-400">
                        Warning: Check Relay 3
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                        <span style={typography.smallText} className="text-gray-300 text-sm">
                          Fuel Supply System
                        </span>
                      </div>
                      <span style={typography.smallText} className="text-xs text-gray-400">
                        Normal
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-blue-400 cursor-pointer">
                    <span style={typography.smallText}>View Full Dashboard</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                  <div style={typography.smallText} className="text-gray-500">
                    Last updated: Just now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={typography.sectionHeadline} className="text-gray-900">
              Streamlined Project Workflow
            </h2>
            <p style={typography.heroSubheadline} className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Our platform handles every stage of your power generation project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded shadow-sm border relative">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                1
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2 text-center">
                Project Setup
              </h3>
              <p style={typography.smallText} className="text-gray-600 text-center">
                Define project parameters, team roles, and regulatory requirements.
              </p>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm border relative">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                2
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2 text-center">
                Permitting & Compliance
              </h3>
              <p style={typography.smallText} className="text-gray-600 text-center">
                Track applications, approvals, and compliance documentation.
              </p>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm border relative">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                3
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2 text-center">
                Financial Tracking
              </h3>
              <p style={typography.smallText} className="text-gray-600 text-center">
                Monitor budgets, expenses, and financial milestones.
              </p>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm border relative">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                4
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2 text-center">
                Construction Monitoring
              </h3>
              <p style={typography.smallText} className="text-gray-600 text-center">
                Track construction progress, issues, and milestone completion.
              </p>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow-sm border">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                5
              </div>
              <h3 style={typography.subSectionHeadline} className="text-gray-900 mb-2 text-center">
                Commissioning & Operations
              </h3>
              <p style={typography.smallText} className="text-gray-600 text-center">
                Monitor performance and maintain compliance during operations.
              </p>
            </div>
          </div>
          <div className="mt-16 bg-gray-100 p-6 rounded shadow-inner">
            <p style={typography.bodyText} className="text-center text-blue-800">
              Our platform provides detailed dashboards and reporting capabilities at each stage of the project lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 style={typography.sectionHeadline} className="font-bold">
              Proven Results
            </h2>
            <p style={typography.heroSubheadline} className="mt-4 text-gray-300 max-w-3xl mx-auto">
              Our platform delivers tangible improvements for power generation projects worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded border">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-center mb-2">
                30%
              </h3>
              <p style={typography.bodyText} className="text-center">
                Reduction in administrative overhead
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded border">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-center mb-2">
                45%
              </h3>
              <p style={typography.bodyText} className="text-center">
                Faster regulatory approvals
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded border">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mx-auto mb-4">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-center mb-2">
                100%
              </h3>
              <p style={typography.bodyText} className="text-center">
                Compliance visibility across projects
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded border">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 style={typography.subSectionHeadline} className="text-center mb-2">
                60%
              </h3>
              <p style={typography.bodyText} className="text-center">
                Improvement in stakeholder reporting time
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <h3 style={typography.subSectionHeadline} className="mb-6">
              Trusted by Leading Power Developers
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="h-12 bg-gray-800 rounded px-6 flex items-center">
                <span style={typography.logo} className="font-bold">
                  EnergyCorp
                </span>
              </div>
              <div className="h-12 bg-gray-800 rounded px-6 flex items-center">
                <span style={typography.logo} className="font-bold">
                  PowerGen
                </span>
              </div>
              <div className="h-12 bg-gray-800 rounded px-6 flex items-center">
                <span style={typography.logo} className="font-bold">
                  SolarTech
                </span>
              </div>
              <div className="h-12 bg-gray-800 rounded px-6 flex items-center">
                <span style={typography.logo} className="font-bold">
                  WindWorks
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-100 rounded-2xl p-10 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 style={typography.sectionHeadline} className="text-gray-900 mb-6">
                Ready to transform your power generation projects?
              </h2>
              <p style={typography.heroSubheadline} className="text-gray-600 mb-8">
                Start your free trial today and experience the difference our comprehensive platform can make.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button style={typography.primaryButton} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded">
                  Start Free Trial
                </button>
                <button style={typography.secondaryButton} className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-gray-900 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center mb-4">
          <Zap className="h-8 w-8 text-blue-400" />
          <span style={typography.logo} className="ml-2">
            PowerTrack
          </span>
        </div>
        <p style={typography.smallText} className="text-gray-400">
          The complete platform for power generation project management.
        </p>
      </div>
      <div>
        <h4 style={typography.subSectionHeadline} className="text-lg font-semibold mb-4">
          Product
        </h4>
        <ul className="space-y-2">
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Features
            </a>
          </li>
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              SCADA Module
            </a>
          </li>
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Roadmap
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 style={typography.subSectionHeadline} className="text-lg font-semibold mb-4">
          Resources
        </h4>
        <ul className="space-y-2">
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Documentation
            </a>
          </li>
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Knowledge Base
            </a>
          </li>
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Case Studies
            </a>
          </li>
          <li>
            <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
              Blog
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 style={typography.subSectionHeadline} className="text-lg font-semibold mb-4">
          Contact
        </h4>
        <ul className="space-y-2">
          <li style={typography.bodyText} className="text-gray-400">
            EdgeTech Consults Ltd
          </li>
          <li style={typography.bodyText} className="text-gray-400">
            Mkungu Close, Beatrice Court
          </li>
          <li style={typography.bodyText} className="text-gray-400">
            Parklands Road, Nairobi KENYA
          </li>
          <li style={typography.bodyText} className="text-gray-400">
            operations@edgetech.co.ke
          </li>
          <li style={typography.bodyText} className="text-gray-400">
            +254 - 736 - 355183
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p style={typography.smallText} className="text-gray-400">
        © 2025 PowerTrack. All rights reserved.
      </p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
          Terms
        </a>
        <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
          Privacy
        </a>
        <a href="#" style={typography.bodyText} className="text-gray-400 hover:text-blue-400">
          Security
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default PowerProjectLanding;