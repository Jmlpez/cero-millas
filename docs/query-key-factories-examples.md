# Practical Examples: Query Key Factories

This file shows concrete examples of how to implement the new query key factories in real components.

## 📋 Table of Contents

1. [Basic Product Query](#example-1-basic-product-query)
2. [Detail Query with Invalidation](#example-2-detail-query-with-invalidation)
3. [Related Queries (Province Products)](#example-3-related-queries-province-products)
4. [Search with Debounce](#example-4-search-with-debounce)
5. [Complex Mutation with Multiple Invalidations](#example-5-complex-mutation-with-multiple-invalidations)
6. [Custom Hook with Factories](#example-6-custom-hook-with-factories)
7. [Prefetch with Factories](#example-7-prefetch-with-factories)
8. [Optimistic Updates](#example-8-optimistic-updates)

---

## Example 1: Basic Product Query

````typescript

```typescript
import { useQuery } from '@tanstack/react-query';
import { productKeys } from '@/lib/query-key-factories';

export const ProductListExample = () => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data, isLoading } = useQuery({
    // ✅ BEFORE: queryKey: ['product', 'list', { pagination }]
    // ✅ NOW: Using factory
    queryKey: productKeys.list(pagination),
    queryFn: () => productApi.getAllPaginated(pagination),
  });

  return (
    <div>
      {/* Render product list */}
    </div>
  );
};
````

## Example 2: Detail Query with Invalidation

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys, getInvalidationKeys } from '@/lib/query-key-factories';

export const ProductDetailExample = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();

  // Query to get the product
  const { data: product } = useQuery({
    // ✅ BEFORE: queryKey: ['product', 'detail', productId]
    // ✅ NOW: Using factory
    queryKey: productKeys.detail(productId),
    queryFn: () => productApi.getById(productId),
  });

  // Mutation to update the product
  const updateMutation = useMutation({
    mutationFn: (data: UpdateProductDto) => productApi.update(productId, data),
    onSuccess: () => {
      // ✅ BEFORE: Manually invalidate each query
      // queryClient.invalidateQueries({ queryKey: ['product', 'list'] });
      // queryClient.invalidateQueries({ queryKey: ['product', 'detail', productId] });

      // ✅ NOW: Using invalidation helper
      getInvalidationKeys.products.specific(productId).forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    }
  });

  return (
    <div>
      {/* Form to edit product */}
    </div>
  );
};

// ==========================================
// EXAMPLE 3: RELATED QUERIES (Province Products)
// ==========================================

export const ProvinceProductExample = ({
  productId,
  provinceId
}: {
  productId: string;
  provinceId: string;
}) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Query for products by province
  const { data: provinceProducts } = useQuery({
    // ✅ BEFORE: queryKey: ['province-product', 'list', provinceId, { pagination }]
    // ✅ NOW: Using factory
    queryKey: provinceProductKeys.list(Number(provinceId), pagination),
    queryFn: () => productApi.getProvinceProductsByProvince(Number(provinceId), pagination),
  });

  // Query for products of a specific province by product
  const { data: productDistribution } = useQuery({
    // ✅ BEFORE: queryKey: ['province-product', 'by-product', productId, { pagination }]
    // ✅ NOW: Using factory
    queryKey: provinceProductKeys.byProduct(productId, pagination),
    queryFn: () => productApi.getProvinceProductsByProduct(productId, pagination),
  });

  // Query for specific detail
  const { data: provinceProductDetail } = useQuery({
    // ✅ BEFORE: queryKey: ['province-product', 'detail', productId, provinceId]
    // ✅ NOW: Using factory
    queryKey: provinceProductKeys.detail(productId, provinceId),
    queryFn: () => productApi.getProvinceProduct(provinceId, productId),
  });

  return (
    <div>
      {/* Render data */}
    </div>
  );
};

// ==========================================
// EXAMPLE 4: SEARCH WITH DEBOUNCE
// ==========================================

export const ProductSearchExample = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: searchResults, isLoading } = useQuery({
    // ✅ BEFORE: queryKey: ['products', 'search', debouncedQuery]
    // ✅ NOW: Using factory
    queryKey: productKeys.search(debouncedQuery),
    queryFn: () => productApi.filterProducts(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
      />
      {/* Render results */}
    </div>
  );
};

// ==========================================
// EXAMPLE 5: COMPLEX MUTATION WITH MULTIPLE INVALIDATIONS
// ==========================================

export const CreateProductExample = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: (data: CreateProductDto) => productApi.create(data),
    onSuccess: (newProduct) => {
      // ✅ BEFORE: Manually invalidate queries
      // queryClient.invalidateQueries({ queryKey: ['product'] });
      // queryClient.invalidateQueries({ queryKey: ['categories'] });

      // ✅ NOW: Using factories and invalidation helpers

      // Invalidate all product lists
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });

      // If the product has a category, invalidate categories too
      if (newProduct.categoryId) {
        queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
      }

      // Optional: Pre-populate the cache for the new product
      queryClient.setQueryData(
        productKeys.detail(newProduct.id),
        newProduct
      );

      navigate(`/products/${newProduct.id}`);
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Form logic
    }}>
      {/* Form fields */}
    </form>
  );
};

// ==========================================
// EXAMPLE 6: CUSTOM HOOK WITH FACTORIES
// ==========================================

export const useProductActions = (productId: string) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => productApi.delete(productId),
    onSuccess: () => {
      // Use helper for related invalidations
      getInvalidationKeys.products.specific(productId).forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    }
  });

  const restoreMutation = useMutation({
    mutationFn: () => productApi.restore(productId),
    onSuccess: () => {
      // Same invalidation as delete
      getInvalidationKeys.products.specific(productId).forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    }
  });

  return {
    deleteProduct: deleteMutation.mutate,
    restoreProduct: restoreMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isRestoring: restoreMutation.isPending,
  };
};

// ==========================================
// EXAMPLE 7: PREFETCH WITH FACTORIES
// ==========================================

export const usePrefetchProductDetail = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = (productId: string) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(productId),
      queryFn: () => productApi.getById(productId),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  return { prefetchProduct };
};

// ==========================================
// EXAMPLE 8: OPTIMISTIC UPDATES
// ==========================================

export const useOptimisticProductUpdate = (productId: string) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProductDto) => productApi.update(productId, data),

    // Optimistic update
    onMutate: async (newData) => {
      // Cancel outgoing queries to prevent them from overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: productKeys.detail(productId) });

      // Snapshot of the previous value
      const previousProduct = queryClient.getQueryData(productKeys.detail(productId));

      // Optimistically update
      queryClient.setQueryData(productKeys.detail(productId), (old: ProductDto) => ({
        ...old,
        ...newData,
      }));

      // Return context with the previous value
      return { previousProduct };
    },

    onError: (err, newData, context) => {
      // Revert on error
      if (context?.previousProduct) {
        queryClient.setQueryData(productKeys.detail(productId), context.previousProduct);
      }
    },

    onSettled: () => {
      // Ensure data is up to date
      queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
    },
  });

  return updateMutation;
};

// ==========================================
// EXAMPLE 9: GLOBAL QUERY CONFIGURATION
// ==========================================

export const QueryConfigExample = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes by default
        gcTime: 1000 * 60 * 30, // 30 minutes in cache
        retry: (failureCount, error) => {
          // Don't retry for 404 errors
          if (error?.status === 404) return false;
          return failureCount < 3;
        },
      },
      mutations: {
        onError: (error) => {
          // Global mutation error handling
          console.error('Mutation error:', error);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {/* App */}
    </QueryClientProvider>
  );
};

/*
==========================================
SUMMARY OF BENEFITS WITH EXAMPLES:
==========================================

1. ✅ CONSISTENCY:
   - Before: ['product', 'list'] vs ['products', 'list']
   - Now: productKeys.list() always the same

2. ✅ AUTOCOMPLETION:
   - productKeys. → TypeScript autocompletion
   - Detects typos at compile time

3. ✅ EASY REFACTORING:
   - Change in factory → all usages updated
   - Simplified search and replace

4. ✅ INTELLIGENT INVALIDATION:
   - getInvalidationKeys.products.specific(id)
   - No more forgotten queries

5. ✅ IMPROVED DEBUGGING:
   - Consistent keys in React Query DevTools
   - Easy identification of related queries

6. ✅ OPTIMIZATIONS:
   - Prefetch with correct keys
   - Safe optimistic updates
   - Centralized cache management
*/
```
