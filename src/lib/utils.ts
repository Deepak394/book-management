import { clsx, type ClassValue } from 'clsx';
import type { Category, CategoryNode } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export interface LeafCategoryOption {
  id: string;
  path: string;
}

export function flattenLeafCategoryPaths(tree: CategoryNode[]): LeafCategoryOption[] {
  const result: LeafCategoryOption[] = [];

  function walk(node: CategoryNode, trail: string[]) {
    const nextTrail = [...trail, node.name];
    if (!node.children || node.children.length === 0) {
      result.push({ id: node._id, path: nextTrail.join(' > ') });
    } else {
      node.children.forEach((child) => walk(child, nextTrail));
    }
  }

  tree.forEach((root) => walk(root, []));
  return result;
}

export function buildCategoryBreadcrumb(leaf: Category | undefined, categories: Category[]): Category[] {
  if (!leaf) return [];
  const byId = new Map(categories.map((c) => [c._id, c]));
  const chain: Category[] = [];
  let current: Category | undefined = byId.get(leaf._id) || leaf;
  while (current) {
    chain.unshift(current);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return chain;
}

export function formatDate(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function toDateInputValue(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toISOString().split('T')[0];
}

export function resolveImageUrl(path?: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return path;
}

export function getErrorMessage(err: unknown): string {
  const anyErr = err as any;
  return anyErr?.response?.data?.message || anyErr?.message || 'Something went wrong';
}
