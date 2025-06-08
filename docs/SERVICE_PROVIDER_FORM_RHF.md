# Service Provider Registration Form - React Hook Form Implementation

## Overview

The service provider registration form has been successfully migrated to use **React Hook Form** with **shadcn/ui Form components** and **Zod validation**. This modern approach provides better performance, type safety, and user experience.

## Key Features

### 🎯 **Modern Tech Stack**

- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: Type-safe schema validation with TypeScript integration
- **shadcn/ui**: Beautiful, accessible UI components
- **Multi-step Wizard**: Step-by-step user experience with progress tracking

### 📋 **Form Structure**

#### Step 1: Business Information

- Business Name (required)
- Business Type (individual, company, partnership, LLC)
- Service Category (from predefined categories)
- Contact Person (required)
- Email (required, validated)
- Phone (required)
- Business License (file upload, required)
- Business Registration (file upload, optional)

#### Step 2: Location & Details

- Governorate (Lebanese governorates)
- City (required)
- Complete Address (required)
- Website (optional, URL validated)
- Service Description (minimum 50 characters)
- Years of Experience (0-1, 1-3, 3-5, 5-10, 10+)
- Certifications (file upload, optional)
- Portfolio (file upload, optional)
- Terms & Conditions Agreement (required)

### 🎨 **UI/UX Features**

#### Progress Indicator

- Visual step indicator with completion status
- Green checkmarks for completed steps
- Current step highlighting

#### Validation

- Real-time field validation
- Arabic error messages
- Server-side error handling
- File upload validation (size, type)

#### Responsive Design

- Mobile-first approach with Tailwind CSS
- Grid layouts that adapt to screen size
- Touch-friendly file upload areas

#### Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- RTL (Right-to-Left) text support for Arabic

### 🔧 **Technical Implementation**

#### File Structure

```
components/organisms/service-provider-form-rhf.tsx  # Main form component
app/service-provider/register/page.tsx              # Page wrapper with server action
lib/validations/service-provider.ts                 # Zod validation schemas
lib/data/service-provider.ts                        # Data fetching functions
lib/actions/service-provider.ts                     # Server actions
```

#### Key Dependencies

- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod integration
- `zod`: Schema validation
- `shadcn/ui`: UI components

### 🔄 **Form Flow**

1. **Step Navigation**: Users can move between steps with validation
2. **Field Validation**: Real-time validation with Arabic error messages
3. **File Uploads**: Drag-and-drop file upload with progress indication
4. **Form Submission**: Server action handles form data and file uploads
5. **Error Handling**: Both client and server errors are displayed appropriately

### 📁 **File Upload Features**

- **Supported Formats**: PDF, DOC, DOCX, JPG, PNG
- **Size Limit**: 10MB per file
- **Multiple Files**: Support for multiple file selection
- **Visual Feedback**: Upload progress and file count display
- **Validation**: File type and size validation

### 🌐 **Localization**

- **Arabic Interface**: All labels and messages in Arabic
- **RTL Support**: Right-to-left text direction
- **Lebanese Context**: Governorates and service categories relevant to Lebanon

### 🚀 **Performance Optimizations**

- **Minimal Re-renders**: React Hook Form optimizes rendering
- **Lazy Loading**: Data fetching only when needed
- **Form State Persistence**: Values maintained between steps
- **Optimistic Updates**: Immediate feedback for user actions

## Usage Example

```tsx
import { ServiceProviderForm } from "@/components/organisms/service-provider-form-rhf";
import { registerServiceProviderAction } from "@/lib/actions/service-provider";

export default function RegisterPage() {
  const handleSubmit = async (data) => {
    // Convert form data to FormData for file uploads
    const formData = new FormData();
    // ... handle form submission
    return await registerServiceProviderAction(formData);
  };

  return <ServiceProviderForm onSubmit={handleSubmit} />;
}
```

## Benefits of This Implementation

1. **Type Safety**: Full TypeScript support with Zod schema inference
2. **Performance**: Minimal re-renders and efficient form handling
3. **User Experience**: Smooth navigation with validation feedback
4. **Maintainability**: Clean separation of concerns and modular code
5. **Accessibility**: WCAG compliant with proper semantic markup
6. **Internationalization**: Full Arabic support with RTL layout

This implementation provides a robust, user-friendly, and maintainable solution for service provider registration in the honna-lahonna platform.
