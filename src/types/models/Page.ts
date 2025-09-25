export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number; // current page (0-based)
    size: number;
}