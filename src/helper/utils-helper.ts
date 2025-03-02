import { t } from 'i18next';
import { UiServices } from '../service/ui-service.ts';

export class UtilsHelper {
  private uiService = new UiServices();

  scrollToTop() {
    const scrollDuration = 0;

    const start = performance.now();

    function step() {
      const progress = (performance.now() - start) / scrollDuration;
      const easedProgress = easingFn(progress); // Replace `easingFn` with your chosen easing function
      const newScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const targetPosition = 0; // Scroll to the top of the page

      const newPosition = targetPosition + (newScrollTop - targetPosition) * (1 - easedProgress);

      document.body.scrollTop = newPosition;
      document.documentElement.scrollTop = newPosition;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    const easingFn = function (t: any) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    window.requestAnimationFrame(step);
  }

  async copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        this.uiService.handleSnackbarSuccess(t('text_copied_to_clipboard_successfully'));
      } catch (err) {
        console.error('Failed to copy text: ', err);
        this.uiService.handleSnackbarError(t('text_copied_to_clipboard_failed'));
      }
    } else {
      // Fallback to the execCommand method if Clipboard API is not available
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.uiService.handleSnackbarSuccess(t('text_copied_to_clipboard_successfully'));
        } else {
          throw new Error('Copy command was unsuccessful');
        }
      } catch (err) {
        console.error('Failed to copy text: ', err);
        this.uiService.handleSnackbarError(t('text_copied_to_clipboard_failed'));
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}
export function parseQueryString(query: string): Record<string, string | number> {
  const queryString = query.startsWith('?') ? query.slice(1) : query;

  return queryString.split('&').reduce(
    (acc, pair) => {
      const [key, value] = pair.split('=');

      if (key === 'undefined' || key === null || value === 'undefined' || value === 'null' || value === '') {
        return acc;
      }

      acc[key] = isNaN(Number(value)) ? decodeURIComponent(value) : Number(value);
      return acc;
    },
    {} as Record<string, string | number>,
  );
}
