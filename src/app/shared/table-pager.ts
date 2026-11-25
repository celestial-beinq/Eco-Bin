import { Signal, computed, signal } from '@angular/core';

/**
 * Client-side pagination over a (filtered) list signal.
 *
 * The page is clamped to the last available page, so when a filter or search
 * shrinks the list the table never lands on an empty page.
 */
export class TablePager<T> {
  readonly pageSizeOptions = [5, 10, 20];

  private readonly requestedPage = signal(1);
  readonly pageSize = signal(10);

  readonly total = computed(() => this.source().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  readonly page = computed(() => Math.min(this.requestedPage(), this.totalPages()));

  readonly rows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.source().slice(start, start + this.pageSize());
  });

  readonly start = computed(() => (this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1));
  readonly end = computed(() => Math.min(this.page() * this.pageSize(), this.total()));

  /** Page buttons with gaps (null) when there are many pages, e.g. 1 … 4 5 6 … 12 */
  readonly pageItems = computed<(number | null)[]>(() => {
    const total = this.totalPages();
    const current = this.page();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const items: (number | null)[] = [1];
    const from = Math.max(2, current - 1);
    const to = Math.min(total - 1, current + 1);
    if (from > 2) items.push(null);
    for (let p = from; p <= to; p++) items.push(p);
    if (to < total - 1) items.push(null);
    items.push(total);
    return items;
  });

  constructor(private readonly source: Signal<T[]>, pageSize = 10) {
    this.pageSize.set(pageSize);
  }

  goTo(page: number): void {
    this.requestedPage.set(Math.min(Math.max(1, page), this.totalPages()));
  }

  next(): void {
    this.goTo(this.page() + 1);
  }

  prev(): void {
    this.goTo(this.page() - 1);
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.requestedPage.set(1);
  }

  /** Back to page 1, e.g. after the search text changes. */
  reset(): void {
    this.requestedPage.set(1);
  }
}
