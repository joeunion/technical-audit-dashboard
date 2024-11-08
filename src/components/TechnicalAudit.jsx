import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Code2, 
  GitBranch, 
  Server, 
  Shield, 
  Zap
} from "lucide-react";

const FindingHoverCard = ({ finding, visible, onMouseLeave, position }) => {
  if (!visible || !finding) return null;
  
  return (
    <div 
      className="absolute bg-white rounded-lg shadow-lg p-4 z-50 max-w-md"
      style={{
        top: position.top,
        left: position.left,
        transformOrigin: 'top left'
      }}
      onMouseLeave={onMouseLeave}
    >
      <h4 className="font-medium mb-2">{finding.title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{finding.description}</p>
    </div>
  );
};

const TechnicalAudit = () => {
  const [hoveredFinding, setHoveredFinding] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (finding, event) => {
    const rect = event.target.getBoundingClientRect();
    setHoverPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    });
    setHoveredFinding(finding);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case '🔴':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case '🟡':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case '🟢':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  // Start with just a few key findings for testing
  const findingDetails = {
    // Infrastructure (Green)
    "Using modern Azure managed services": {
      title: "Azure Managed Services",
      description: "The system effectively utilizes Azure's platform-as-a-service offerings, providing built-in scalability and security features"
    },
    "Automated backup configured": {
      title: "Automated Backups",
      description: "24-hour automated backup system properly configured, ensuring data recovery capabilities are in place"
    },
    "KeyVault used for sensitive data": {
      title: "Secure Key Management",
      description: "Sensitive configuration and secrets properly stored in Azure KeyVault, following security best practices"
    },
    "Azure App Insights integration": {
      title: "Application Monitoring",
      description: "Basic monitoring through Azure Application Insights, though requiring additional configuration for full coverage"
    },

    // Deployment (Green)
    "Feature branch strategy implemented": {
      title: "Branch Strategy",
      description: "Clear and effective feature branch workflow is being followed by the development team"
    },
    "Environment-specific configurations": {
      title: "Environment Management",
      description: "Proper configuration separation between development, staging, and production environments"
    },
    "Meaningful commit messages": {
      title: "Version Control Quality",
      description: "Team maintains clear and descriptive commit messages, improving code history tracking"
    },
    "Azure managed services deployment": {
      title: "Cloud Deployment",
      description: "Effective use of Azure managed services for deployment, reducing operational complexity"
    },

    // Security & Compliance (Red)
    "Mixed PHI encryption implementation": {
      title: "PHI Encryption Issues",
      description: "Protected Health Information encryption is inconsistent across system components, creating potential security vulnerabilities"
    },
    "Incomplete authorization checks": {
      title: "Authorization Gaps",
      description: "API endpoints lack comprehensive authorization checks, risking unauthorized access to sensitive operations"
    },
    "Limited audit logging of system access": {
      title: "Insufficient Logging",
      description: "System access and changes are not comprehensively tracked, hindering security audits and incident investigation"
    },
    "Missing role-based access controls": {
      title: "Access Control Issues",
      description: "No structured role-based access control system, making permission management difficult and error-prone"
    },
    "Potential HIPAA compliance violations": {
      title: "Compliance Risk",
      description: "Current security gaps and incomplete documentation pose significant HIPAA compliance risks"
    },

    // Testing Coverage (Red)
    "Less than 5% code coverage": {
      title: "Minimal Test Coverage",
      description: "Critical lack of automated test coverage, significantly increasing the risk of undetected issues"
    },
    "No integration or UI testing": {
      title: "Missing Integration Tests",
      description: "Absence of integration and UI testing means complex system interactions remain unverified"
    },
    "Missing QA team or resources": {
      title: "No QA Resources",
      description: "Lack of dedicated quality assurance team or resources results in inconsistent testing practices"
    },
    "No automated quality gates": {
      title: "Missing Quality Gates",
      description: "No automated quality checks in the deployment pipeline to prevent problematic code from reaching production"
    },
    "High risk of undetected bugs": {
      title: "Quality Risk",
      description: "Combination of low test coverage and manual testing significantly increases risk of production issues"
    },

    // Code Quality (Red)
    "Business logic mixed with UI code": {
      title: "Poor Code Separation",
      description: "Business logic tightly coupled with UI code, making the system harder to test and maintain"
    },
    "No documented coding standards": {
      title: "Missing Standards",
      description: "Lack of documented coding standards leads to inconsistent code quality and maintenance challenges"
    },
    "Outdated technical documentation": {
      title: "Documentation Issues",
      description: "Technical documentation is outdated or missing, creating knowledge gaps and onboarding difficulties"
    },
    "Missing static code analysis": {
      title: "No Code Analysis",
      description: "Lack of static code analysis tools means common code issues aren't caught automatically"
    },
    "Growing technical debt": {
      title: "Technical Debt",
      description: "Accumulating technical shortcuts and workarounds are making the system increasingly difficult to maintain"
    },

    // System Architecture (Red)
    "Monolithic architecture": {
      title: "Monolithic Structure",
      description: "Single, tightly-coupled application unit making it difficult to scale or modify individual components"
    },
    "No caching strategy": {
      title: "Missing Cache Layer",
      description: "Lack of caching strategy leads to unnecessary database calls and reduced performance"
    },
    "Poor concurrent user handling": {
      title: "Concurrency Issues",
      description: "System struggles with multiple simultaneous users, leading to conflicts and performance problems"
    },
    "Missing disaster recovery procedures": {
      title: "Recovery Process Gaps",
      description: "No documented or tested disaster recovery procedures, putting system reliability at risk"
    },
    "Limited scalability options": {
      title: "Scalability Problems",
      description: "Current architecture restricts ability to scale for increased load or user growth"
    },

    // Development Practices (Yellow)
    "Strong version control processes": {
      title: "Version Control",
      description: "Effective version control practices with feature branches and meaningful commit messages"
    },
    "Inconsistent code review practices": {
      title: "Code Review Issues",
      description: "Code review process lacks standardization and comprehensive review criteria"
    },
    "Limited automated checks in PRs": {
      title: "PR Automation Gaps",
      description: "Pull requests lack comprehensive automated checks for code quality and security"
    },
    "Missing SonarQube or quality gates": {
      title: "Quality Gate Gaps",
      description: "No automated quality gates or code analysis tools in the development pipeline"
    },
    "Automated deployment pipeline in place": {
      title: "Deployment Process",
      description: "Basic automated deployment pipeline exists but lacks comprehensive quality checks"
    }
  };

  // Start with just two health areas
  const healthAreas = [
    {
      title: "Infrastructure",
      icon: <Server className="h-5 w-5" />,
      status: '🟢',
      findings: [
        "Using modern Azure managed services",
        "Automated backup configured",
        "KeyVault used for sensitive data",
        "Environment-specific configurations",
        "Azure App Insights integration"
      ]
    },
    {
      title: "Deployment",
      icon: <GitBranch className="h-5 w-5" />,
      status: '🟢',
      findings: [
        "Automated deployment pipeline in place",
        "Feature branch strategy implemented",
        "Environment-specific configurations",
        "Meaningful commit messages",
        "Azure managed services deployment"
      ]
    },
    {
      title: "Security & Compliance",
      icon: <Shield className="h-5 w-5" />,
      status: '🔴',
      findings: [
        "Mixed PHI encryption implementation",
        "Incomplete authorization checks",
        "Limited audit logging of system access",
        "Missing role-based access controls",
        "Potential HIPAA compliance violations"
      ]
    },
    {
      title: "Testing Coverage",
      icon: <Zap className="h-5 w-5" />,
      status: '🔴',
      findings: [
        "Less than 5% code coverage",
        "No integration or UI testing",
        "Missing QA team or resources",
        "No automated quality gates",
        "High risk of undetected bugs"
      ]
    },
    {
      title: "Code Quality",
      icon: <Code2 className="h-5 w-5" />,
      status: '🔴',
      findings: [
        "Business logic mixed with UI code",
        "No documented coding standards",
        "Outdated technical documentation",
        "Missing static code analysis",
        "Growing technical debt"
      ]
    },
    {
      title: "System Architecture",
      icon: <Server className="h-5 w-5" />,
      status: '🔴',
      findings: [
        "Monolithic architecture",
        "No caching strategy",
        "Poor concurrent user handling",
        "Missing disaster recovery procedures",
        "Limited scalability options"
      ]
    },
    {
      title: "Development Practices",
      icon: <GitBranch className="h-5 w-5" />,
      status: '🟡',
      findings: [
        "Strong version control processes",
        "Inconsistent code review practices",
        "Limited automated checks in PRs",
        "Missing SonarQube or quality gates",
        "Automated deployment pipeline in place"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12 bg-gray-50">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light tracking-tight">EZDocs Technical Audit</h1>
        <p className="text-xl text-gray-600 font-light">System Health Assessment and Business Impact Analysis</p>
      </div>

      {/* Executive Alert */}
      <div className="flex items-start space-x-4">
        <AlertCircle className="h-6 w-6 text-red-500 mt-1" />
        <div>
          <h2 className="text-xl font-medium mb-2">Executive Summary</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>Our technical audit reveals major system constraints and risks:</p>
            <ul className="space-y-1 list-inside">
              <li>• System architecture is tightly coupled to AllScripts, blocking multi-EHR support</li>
              <li>• Critical HIPAA compliance gaps in PHI encryption and audit logging</li>
              <li>• Performance issues from poor concurrent user handling and no caching</li>
              <li>• High risk of new bugs with only 5% test coverage and no manual or automated QA</li>
              <li>• Growing code complexity severely impacts development speed and quality</li>
              <li>• High likelihood of users discovering bugs in production due to limited testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-light mb-6">Strategic Recommendations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Patch Option */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span>Option 1: Patch & Stabilize</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Quick fixes to EZDocs system while maintaining legacy architecture.</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Timeline: 2-3 months</p>
                  <p className="text-sm font-medium">Key Actions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Patch HIPAA compliance gaps</li>
                    <li>• Add basic testing</li>
                    <li>• Performance band-aids</li>
                    <li>• Basic monitoring</li>
                  </ul>
                  <p className="text-sm font-medium mt-4">Impact:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Remains tightly coupled to AllScripts</li>
                    <li>• No modern API architecture</li>
                    <li>• Poor concurrent user support</li>
                    <li>• Limited scalability</li>
                  </ul>
                  <p className="text-sm font-medium mt-4">Resources Required:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1x new QA resources</li>
                    <li>• Existing development team</li>
                    <li>• Basic monitoring budget</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deep Refactor Option */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5 text-blue-500" />
                  <span>Option 2: Deep Refactor</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Modernize EZDocs codebase while maintaining server-side rendering architecture.</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Timeline: 12-14 months</p>
                  <p className="text-sm font-medium">Key Actions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Improve current architecture</li>
                    <li>• Add security & compliance</li>
                    <li>• Basic EHR abstraction</li>
                    <li>• Add testing coverage</li>
                  </ul>
                  <p className="text-sm font-medium mt-4">Impact:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Still no modern API architecture</li>
                    <li>• Limited by server-side rendering</li>
                    <li>• Complex state management remains</li>
                    <li>• Performance constraints persist</li>
                  </ul>
                  <p className="text-sm font-medium mt-4">Resources Required:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Additional QA resources</li>
                    <li>• Extended development team</li>
                    <li>• Infrastructure upgrade costs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Build on Olla Option */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-green-500" />
                  <span>Option 3: Provider UX on Olla</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Support existing provider workflows using modern infrastructure on Olla.</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Timeline: 5-7 months</p>
                  <p className="text-sm font-medium">Key Actions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Match existing provider workflows</li>
                    <li>• Leverage proven infrastructure</li>
                    <li>• Enable multi-EHR support</li>
                    <li>• Built-in compliance frameworks</li>
                  </ul>
                  <p className="text-sm font-medium mt-4">Impact:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Modern API-first architecture</li>
                    <li>• Reuse existing Olla infrastructure</li>
                    <li>• Maintain workflow familiarity</li>
                    <li>• Faster feature development cycles</li>
                  </ul>
                  <p className="text-sm font-medium mt-4">Resources Required:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Shift budget to ForthBridge ProServe</li>
                    <li>• ForthBridge manages EZDocs</li>
                    <li>• ForthBridge implements Olla</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Health Areas */}
      <h2 className="text-xl font-medium mb-2">Audit Results</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {healthAreas.map((area, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  area.status === '🔴' ? 'bg-red-50 text-red-500' :
                  area.status === '🟡' ? 'bg-yellow-50 text-yellow-500' :
                  'bg-green-50 text-green-500'
                }`}>
                  {area.icon}
                </div>
                <h3 className="text-lg font-medium">{area.title}</h3>
              </div>
              {getStatusIcon(area.status)}
            </div>
            <ul className="space-y-3">
              {area.findings.map((finding, idx) => (
                <li 
                  key={idx} 
                  className="relative flex items-start space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                  onMouseEnter={(e) => handleMouseEnter(finding, e)}
                  onMouseLeave={() => setHoveredFinding(null)}
                >
                  <div className="mt-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${
                      area.status === '🔴' ? 'bg-red-500' :
                      area.status === '🟡' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed hover:text-gray-900">
                    {finding}
                  </span>
                </li>
              ))}
            </ul>
            <FindingHoverCard
              finding={findingDetails[hoveredFinding]}
              visible={hoveredFinding !== null}
              onMouseLeave={() => setHoveredFinding(null)}
              position={hoverPosition}
            />
          </div>
        ))}
      </div>
      {/* Business Impact Analysis */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-light mb-8">Business Impact Analysis</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Immediate Risks</h3>
            <ul className="space-y-3">
              {[
                "Security compliance violations",
                "System instability",
                "Rising support burden",
                "Slower feature delivery"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="mt-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">User Impact</h3>
            <ul className="space-y-3">
              {[
                "Cannot work simultaneously",
                "System slowdowns",
                "Risk of lost work",
                "Performance degradation"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="mt-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Development Impact</h3>
            <ul className="space-y-3">
              {[
                "High bug introduction risk",
                "Complex deployment process",
                "Manual testing overhead",
                "Growing technical debt"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="mt-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>




      {/* Recent Examples */}
      {/*<div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">*/}
      {/*  <h2 className="text-2xl font-light mb-6">Recent Impact Examples</h2>*/}
      {/*  <div className="space-y-6">*/}
      {/*    <div className="space-y-3">*/}
      {/*      <h3 className="font-medium">Performance Issues</h3>*/}
      {/*      <p className="text-gray-600 text-sm leading-relaxed">*/}
      {/*        EZDocs ordering performance issues required a hotfix that was released without proper testing, */}
      {/*        resulting in additional work when the fix proved ineffective.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className="space-y-3">*/}
      {/*      <h3 className="font-medium">Deployment Documentation</h3>*/}
      {/*      <p className="text-gray-600 text-sm leading-relaxed">*/}
      {/*        Undocumented deployment processes and lack of team training led to 6 hours of wasted effort */}
      {/*        during critical fixes.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className="space-y-3">*/}
      {/*      <h3 className="font-medium">Caching Implementation</h3>*/}
      {/*      <p className="text-gray-600 text-sm leading-relaxed">*/}
      {/*        Incorrect caching implementation caused scalability issues, with time wasted on incorrect */}
      {/*        approaches despite available solutions from senior developers.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default TechnicalAudit;