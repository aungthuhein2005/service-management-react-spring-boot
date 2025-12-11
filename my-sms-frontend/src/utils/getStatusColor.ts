// Stratum Design System - Status Color Utility
export type StatusType = 'success' | 'warning' | 'critical' | 'info' | 'neutral';

export interface StatusColor {
  color: string;
  bg: string;
  variant: StatusType;
}

/**
 * Get status colors based on Stratum design system
 */
export function getStatusColor(status: string): StatusColor {
  const upperStatus = status.toUpperCase();
  
  // Success/Resolved states
  if (
    upperStatus.includes('RESOLVED') ||
    upperStatus.includes('CLOSED') ||
    upperStatus.includes('COMPLETED') ||
    upperStatus.includes('PAID') ||
    upperStatus.includes('AVAILABLE') ||
    upperStatus.includes('ONLINE') ||
    upperStatus.includes('FIXED')
  ) {
    return {
      color: '#10B981',
      bg: '#D1FAE5',
      variant: 'success'
    };
  }

  // Warning/Pending states
  if (
    upperStatus.includes('PENDING') ||
    upperStatus.includes('ON_HOLD') ||
    upperStatus.includes('SCHEDULED') ||
    upperStatus.includes('IN_PROGRESS')
  ) {
    return {
      color: '#F59E0B',
      bg: '#FEF3C7',
      variant: 'warning'
    };
  }

  // Critical/Error states
  if (
    upperStatus.includes('CRITICAL') ||
    upperStatus.includes('FAILED') ||
    upperStatus.includes('CANCELLED') ||
    upperStatus.includes('ESCALATED') ||
    upperStatus.includes('BREACHED') ||
    upperStatus.includes('DOWN')
  ) {
    return {
      color: '#EF4444',
      bg: '#FEE2E2',
      variant: 'critical'
    };
  }

  // Info/New states
  if (
    upperStatus.includes('OPEN') ||
    upperStatus.includes('NEW') ||
    upperStatus.includes('IN_USE')
  ) {
    return {
      color: '#3B82F6',
      bg: '#DBEAFE',
      variant: 'info'
    };
  }

  // Neutral/Default states
  return {
    color: '#64748B',
    bg: '#F1F5F9',
    variant: 'neutral'
  };
}

/**
 * Get badge variant for status
 */
export function getStatusBadgeVariant(status: string): StatusType {
  return getStatusColor(status).variant;
}
