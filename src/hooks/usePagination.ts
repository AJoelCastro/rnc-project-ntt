import { useEffect, useMemo, useState } from 'react';

/**
 * Hook de paginación genérico.
 * - `data`: array de elementos a paginar
 * - `initialPageSize`: tamaño de página por defecto (>=1)
 * - `initialPage`: página inicial (1-based)
 */
export type UsePaginationResult<T> = {
	currentPage: number;
	pageSize: number;
	totalPages: number;
	totalItems: number;
	currentData: T[];
	hasNext: boolean;
	hasPrev: boolean;
	nextPage: () => void;
	prevPage: () => void;
	goToPage: (page: number) => void;
	setPageSize: (size: number) => void;
	reset: () => void;
};

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

export default function usePagination<T>(
	data: T[] = [],
	initialPageSize = 10,
	initialPage = 1,
): UsePaginationResult<T> {
	const safeInitialSize = Math.max(1, Math.floor(initialPageSize));
	const [pageSize, setPageSizeState] = useState<number>(safeInitialSize);
	const [currentPage, setCurrentPage] = useState<number>(Math.max(1, Math.floor(initialPage)));

	const totalItems = data.length;

	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
	}, [totalItems, pageSize]);

	// Ensure current page is valid when data, pageSize or totalPages change
	useEffect(() => {
		setCurrentPage((p) => clamp(p, 1, totalPages));
	}, [totalPages]);

	const currentData = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return data.slice(start, start + pageSize);
	}, [data, currentPage, pageSize]);

	const hasNext = currentPage < totalPages;
	const hasPrev = currentPage > 1;

	const nextPage = () => setCurrentPage((p) => clamp(p + 1, 1, totalPages));
	const prevPage = () => setCurrentPage((p) => clamp(p - 1, 1, totalPages));
	const goToPage = (page: number) => setCurrentPage(clamp(Math.floor(page), 1, totalPages));

	const setPageSize = (size: number) => {
		const safe = Math.max(1, Math.floor(size));
		setPageSizeState(safe);
		// Cuando cambiamos el tamaño de página, resetear a la página 1 para evitar confusiones
		setCurrentPage(1);
	};

	const reset = () => {
		setPageSizeState(safeInitialSize);
		setCurrentPage(Math.max(1, Math.floor(initialPage)));
	};

	return {
		currentPage,
		pageSize,
		totalPages,
		totalItems,
		currentData,
		hasNext,
		hasPrev,
		nextPage,
		prevPage,
		goToPage,
		setPageSize,
		reset,
	};
}

