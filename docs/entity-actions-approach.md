# New Entity Actions System

## Motivation

The new entity actions system is designed to make UI actions (edit, delete, manage tags, manage images, etc.) more maintainable, composable, and extensible. The previous approach often mixed UI logic, action logic, and entity-specific details, making it hard to scale and reuse code. This new approach introduces a clear separation of concerns and a type-safe, declarative way to define actions for any entity.

## Key Concepts

### 1. Action Factories

- Actions are defined as factory functions (hooks) that return a typed action object for a given entity.
- Each action describes its type (`button`, `link`,`separator`), icon, label, and behavior (e.g., `onClick`, `href`).
- Factories can be composed and reused across different tables or entity types.

### 2. Strong Typing

- Actions are strongly typed using TypeScript generics, ensuring that only valid properties are set for each action type.
- This prevents runtime errors and improves developer experience with better IntelliSense.

### 3. Separation of UI and Logic

- The UI components (e.g., `BaseEntityAction`, `EntityActionsDropdown`) render actions based on their type, without knowing the business logic.
- The logic for what an action does (e.g., opening a dialog, navigating to a page) is encapsulated in the action factory.

### 4. Extensibility

- New action types (e.g., custom dropdowns, confirmation dialogs) can be added by extending the action type definitions and UI renderers.
- Actions can be conditionally hidden or disabled based on entity state.

## Architecture

### Core Hooks System

The new actions system is built on top of a robust form management architecture that separates concerns and provides reusable patterns for different use cases.

#### useBaseForm

The foundation of the system is `useBaseForm`, which encapsulates all the common logic for handling mutations, queries, form state, and error management. This hook provides:

- **Mutation Management**: Handles API calls with proper loading states and error handling
- **Query Integration**: Automatically loads and populates form data when editing entities
- **Form State**: Manages form validation, submission, and reset logic
- **Error Handling**: Provides standardized error management with field-level and general error support
- **Cache Invalidation**: Automatically invalidates relevant queries after successful mutations

```tsx
const baseForm = useBaseForm({
    defaultValues: { name: '', description: '' },
    formToDto: (data) => ({ ...data, isActive: true }),
    dtoToForm: (entity) => ({ name: entity.name, description: entity.description }),
    getFunction: (id) => api.getById(id),
    mutationFn: (data) => api.update(selectedId, data),
    queryKey: ['entities'],
    onSuccessMessage: 'Entity updated successfully',
});
```

#### Specialized Hook Variations

Based on `useBaseForm`, we have specialized hooks for different contexts:

**useFormDialog**: For modal/dialog-based forms

- Adds dialog state management (open/close)
- Handles entity loading when dialog opens
- Automatically resets form when dialog closes

**useFormPage**: For dedicated page-based forms

- Optimized for full-page forms (create/edit pages)
- No dialog state management overhead
- Handles navigation after successful operations

**useSimpleFormDialog**: For forms that don't manage entities

- Simplified version without entity loading/editing logic
- Perfect for operations like "add images" or "assign tags"
- Only handles form submission and basic state

### Form Hook Examples

```tsx
// Dialog for editing entities
const useEditProduct = () => {
    return useFormDialog({
        defaultValues: { name: '', price: 0 },
        formToDto: (data) => ({ ...data }),
        dtoToForm: (product) => ({ name: product.name, price: product.price }),
        getFunction: (id) => productApi.getById(id),
        mutationFn: (data) => productApi.update(selectedId, data),
        queryKey: productKeys.lists(),
        onSuccessMessage: 'Product updated successfully',
        title: 'Edit Product',
    });
};

// Simple dialog for file operations
const useManageImages = () => {
    return useSimpleFormDialog({
        defaultValues: { images: [] },
        formToDto: (data) => data.images,
        mutationFn: (images) => productApi.uploadImages(selectedId, images),
        queryKey: productKeys.lists(),
        onSuccessMessage: 'Images uploaded successfully',
        title: 'Manage Images',
    });
};

// Page-based form for creation
const useCreateProduct = () => {
    return useFormPage({
        defaultValues: { name: '', price: 0 },
        formToDto: (data) => ({ ...data }),
        mutationFn: (data) => productApi.create(data),
        queryKey: productKeys.lists(),
        onSuccessMessage: 'Product created successfully',
    });
};
```

## Example Usage

```tsx
const manageTags = useManageTags();
const manageImages = useManageImages();
const editProduct = useEditAction<ProductDto>({
    href: (record) => `/products/${record.id}/edit`,
});
const { separator } = useActionUtils<ProductDto>();

const getActions = useCallback(
    (record: ProductDto) => [editProduct(record), separator(), manageTags.action(record), separator(), manageImages.action(record)],
    [editProduct, manageTags, manageImages, separator],
);
```

## How to Add a New Action

1. Create a new action factory hook (e.g., `useDeleteProductAction`).
2. Return an action object with the appropriate type and handlers.
3. Add the action to your `getActions` array for the entity table.

## Benefits

- **Maintainability:** Each action is isolated and easy to update.
- **Reusability:** Actions can be reused across different tables and entities.
- **Type Safety:** Compile-time checks for action properties and form data.
- **Extensibility:** Easy to add new action types or UI renderers.
- **Declarative Form Logic:** Define complex form behavior with simple configuration objects.
- **Automatic State Management:** Loading states, error handling, and cache invalidation are handled automatically.
- **Consistent UX:** Standardized patterns for toasts, validation, and user feedback across all forms.
- **Reduced Boilerplate:** No need to manually write mutation logic, error handling, or state management for each form.

---

_This document will be updated as the system evolves._
