import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TablePager } from '../../shared/table-pager';

/** Pagination footer for a table driven by a TablePager. */
@Component({
  selector: 'app-table-pager',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let p = pager();
    <div class="pager">
      <div class="pager-count">
        @if (p.total() === 0) {
          No {{ label() }} found
        } @else {
          Showing <strong>{{ p.start() }}</strong>–<strong>{{ p.end() }}</strong> of <strong>{{ p.total() }}</strong> {{ label() }}
        }
      </div>

      <div class="pager-size">
        <span class="pager-size-label">Rows per page:</span>
        @for (size of p.pageSizeOptions; track size) {
          <button type="button" class="pager-size-btn" [class.is-active]="p.pageSize() === size" (click)="p.setPageSize(size)">
            {{ size }}
          </button>
        }
      </div>

      <nav class="pager-steps" [attr.aria-label]="label() + ' pages'">
        <button type="button" class="pager-nav" [disabled]="p.page() === 1" (click)="p.prev()" aria-label="Previous page">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>Prev</span>
        </button>

        @for (item of p.pageItems(); track $index) {
          @if (item === null) {
            <span class="pager-gap">…</span>
          } @else {
            <button
              type="button"
              class="pager-num"
              [class.is-active]="item === p.page()"
              [attr.aria-current]="item === p.page() ? 'page' : null"
              (click)="p.goTo(item)"
            >{{ item }}</button>
          }
        }

        <button type="button" class="pager-nav" [disabled]="p.page() === p.totalPages()" (click)="p.next()" aria-label="Next page">
          <span>Next</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </nav>
    </div>
  `,
  styles: [`
    :host { display: block; }

    .pager {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding: 12px 18px;
      border-top: 1px solid #f1f5f9;
      background: #ffffff;
      font-size: 11.5px;
      color: #64748b;
    }

    .pager-count strong {
      color: #0e2a16;
      font-variant-numeric: tabular-nums;
    }

    .pager-size,
    .pager-steps {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .pager-size-label {
      margin-right: 4px;
      font-size: 11px;
      font-weight: 500;
    }

    .pager-size-btn,
    .pager-nav,
    .pager-num {
      border: 1px solid #e2e8f0;
      background: #ffffff;
      color: #334155;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }

    .pager-size-btn {
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      color: #475569;
    }

    .pager-nav {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 28px;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .pager-num {
      min-width: 28px;
      height: 28px;
      padding: 0 6px;
      border-radius: 6px;
      font-variant-numeric: tabular-nums;
    }

    .pager-gap {
      min-width: 20px;
      text-align: center;
      color: #94a3b8;
    }

    .pager-size-btn:hover,
    .pager-num:hover,
    .pager-nav:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #0e2a16;
    }

    .pager-size-btn.is-active,
    .pager-num.is-active {
      background: #0e2a16;
      border-color: #0e2a16;
      color: #ffffff;
    }

    .pager-nav:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .pager {
        flex-direction: column;
        gap: 10px;
      }
    }
  `],
})
export class TablePagerComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pager = input.required<TablePager<any>>();
  label = input<string>('results');
}
