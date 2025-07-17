# Sistema de Query Key Factories - React Query

# Query Key Factories System - React Query

## 📖 Overview

This project now uses a centralized **Query Key Factories** system to manage all React Query `queryKeys` in a
consistent, scalable, and maintainable way.

## 🔧 What are Query Key Factories?

Query Key Factories are functions/objects that generate `queryKeys` in a standardized way for each feature or entity in
the system. Instead of writing arrays manually in each component, we now use factories that guarantee consistency.

### Before ❌

```typescript
// Different ways of writing the same query key in different files
queryKey: ['product', 'list', { pagination }];
queryKey: ['products', 'list', pagination]; // ❌ Inconsistent
queryKey: ['product', 'details', id]; // ❌ Typo: "details" vs "detail"
```

### After ✅

```typescript
// Import the factory
import { productKeys } from '@/lib/query-key-factories';

// Use the factory consistently
queryKey: productKeys.list(pagination);
queryKey: productKeys.detail(id);
```

## 🏗️ System Structure

### Main File: `src/lib/query-key-factories.ts`

This file contains all factories organized by feature:

#### 1. **Product Keys** (`productKeys`)

```typescript
productKeys.all; // ['product']
productKeys.lists(); // ['product', 'list']
productKeys.list(pagination); // ['product', 'list', { pagination }]
productKeys.detail(id); // ['product', 'detail', id]
productKeys.search(query); // ['products', 'search', query]
productKeys.packDetail(id); // ['product', 'pack', 'detail', id]
```

#### 2. **Category Keys** (`categoryKeys`)

```typescript
categoryKeys.all; // ['categories']
categoryKeys.list(pagination); // ['categories', 'list', { pagination }]
categoryKeys.detail(id); // ['categories', 'detail', id]
```

#### 3. **Province Product Keys** (`provinceProductKeys`)

```typescript
provinceProductKeys.all; // ['province-product']
provinceProductKeys.list(provinceId, pagination); // ['province-product', 'list', provinceId, { pagination }]
provinceProductKeys.detail(productId, provinceId); // ['province-product', 'detail', productId, provinceId]
provinceProductKeys.byProduct(productId, pagination); // ['province-product', 'by-product', productId, { pagination }]
```

#### 4. **Tag Keys** (`tagKeys`)

```typescript
tagKeys.search(query); // ['tags', 'search', query]
```

### Utility: `getInvalidationKeys`

To facilitate invalidation of related queries:

```typescript
// Invalidate all product queries
getInvalidationKeys.products.all();

// Invalidate specific queries when editing a product
getInvalidationKeys.products.specific(productId);
```

## 🚀 System Benefits

### 1. **Consistency**

- ✅ Eliminates typos and variations in queryKeys
- ✅ Guarantees the same format throughout the project
- ✅ Reduces cache invalidation errors

### 2. **Maintainability**

- ✅ Structure changes are made in one place only
- ✅ Safer and easier refactoring
- ✅ Simplified search and replace

### 3. **Developer Experience**

- ✅ TypeScript autocompletion
- ✅ Inline documentation with TSDoc
- ✅ Compile-time error detection

### 4. **Scalability**

- ✅ Easy to add new features
- ✅ Clear organization by entity
- ✅ Reusable patterns

## 🔄 How to Use in New Components

### 1. For Queries:

```typescript
import { productKeys } from '@/lib/query-key-factories';

const { data } = useQuery({
    queryKey: productKeys.list(pagination),
    queryFn: () => fetchProducts(pagination),
});
```

### 2. For Mutations (invalidation):

```typescript
import { getInvalidationKeys } from '@/lib/query-key-factories';

const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
        // Invalidate all product lists
        queryClient.invalidateQueries({
            queryKey: productKeys.lists(),
        });
    },
});
```

### 3. For Complex Invalidations:

```typescript
import { getInvalidationKeys } from '@/lib/query-key-factories';

const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
        // Invalidate specific queries related to the product
        getInvalidationKeys.products.specific(productId).forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
        });
    },
});
```

## 🎯 Next Steps

### Phase 2: System Expansion

1. **Auth Keys**: Add factories for authentication
2. **User Keys**: User-related queries
3. **Dashboard Keys**: Metrics and statistics

### Phase 3: Optimizations

1. **Query Selectors**: Implement selectors to optimize re-renders
2. **Cache Time Configuration**: Centralized cache configurations
3. **Error Boundaries**: Centralized error handling by feature

## 🤝 Team Conventions

### Naming:

- `{feature}Keys` for the main factory
- `all()` for the base array of the feature
- `lists()` for listing queries
- `list(params)` for specific listing queries
- `details()` for general detail queries
- `detail(id)` for specific detail queries

### QueryKey Structure:

```typescript
// Pattern: [feature, action, ...params]
['product', 'list', { pagination }][('product', 'detail', id)][('province-product', 'by-product', productId, { pagination })];
```

---

## 💡 Why was this change necessary?

### Previous Problems:

1. **Inconsistencies**: `['product']` vs `['products']` in different files
2. **Typos**: `['product', 'details', id]` vs `['product', 'detail', id]`
3. **Duplication**: Same queryKeys written multiple times
4. **Incorrect Invalidation**: Queries not invalidated due to incorrect keys
5. **Refactoring Difficulty**: Changing a structure required searching throughout the entire project

### Solution:

✅ **Complete centralization** of all queryKeys  
✅ **TypeScript autocompletion** and error detection  
✅ **Guaranteed consistency** throughout the project  
✅ **Simplified maintenance** with a single point of change  
✅ **Improved scalability** for new features

This system is **the foundation** for sustainable project growth and better development practices with React Query.
