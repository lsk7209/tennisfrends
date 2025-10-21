// 접근성 유틸리티 함수들

/**
 * ARIA 라벨 생성
 */
export function generateAriaLabel(text: string, context?: string): string {
  return context ? `${text}, ${context}` : text;
}

/**
 * 스크린 리더 전용 텍스트 생성
 */
export function createScreenReaderText(text: string): string {
  return `<span class="sr-only">${text}</span>`;
}

/**
 * 키보드 네비게이션을 위한 포커스 관리
 */
export function focusElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
  }
}

/**
 * 포커스 트랩 (모달 등에서 사용)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  // 첫 번째 요소에 포커스
  firstElement?.focus();
  
  // 정리 함수 반환
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * 색상 대비 검사
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 색상이 접근성 기준을 만족하는지 확인
 */
export function isAccessibleColor(foreground: string, background: string): boolean {
  const ratio = getContrastRatio(foreground, background);
  return ratio >= 4.5; // WCAG AA 기준
}

/**
 * HEX 색상을 RGB로 변환
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * 애니메이션 감소 설정 확인
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 고대비 모드 확인
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * 다크 모드 확인
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * 스크린 리더 전용 클래스
 */
export const srOnly = 'sr-only';
export const notSrOnly = 'not-sr-only';

/**
 * 포커스 스타일 클래스
 */
export const focusVisible = 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500';
export const focusRing = 'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
