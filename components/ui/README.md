# 🎨 UI Components Library

This folder contains reusable, framework-agnostic UI components following the Malgist design system.

---

## 📦 Available Components

### Button

A versatile button component with multiple variants, sizes, and loading states.

**Variants:**
- `primary` - Emerald solid background
- `secondary` - Dark background with border
- `outline` - Transparent with border
- `ghost` - Transparent, no border
- `gradient-emerald` - Emerald gradient
- `gradient-indigo` - Indigo gradient

**Usage:**

```tsx
import { Button } from '@/components/ui';
import { Download, ArrowRight } from 'lucide-react';

// Basic usage
<Button>Click me</Button>

// With icon
<Button icon={Download} variant="gradient-emerald">
  Deposit
</Button>

// Icon on the right
<Button icon={ArrowRight} iconPosition="right" variant="gradient-indigo">
  Create Strategy
</Button>

// Loading state
<Button isLoading variant="primary">
  Processing...
</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'gradient-emerald' \| 'gradient-indigo'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `icon` | `LucideIcon` | - | Lucide icon component |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `isLoading` | `boolean` | `false` | Show loading spinner |
| `fullWidth` | `boolean` | `false` | Full width button |
| `disabled` | `boolean` | `false` | Disable button |

---

### Card

A flexible card component with multiple variants and subcomponents.

**Variants:**
- `default` - Standard card with border
- `elevated` - Card with shadow
- `bordered` - Transparent background with border
- `gradient` - Gradient background (emerald)

**Usage:**

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

// Basic card
<Card>
  <p>Card content</p>
</Card>

// Card with header
<Card variant="elevated">
  <CardHeader>
    <CardTitle>Portfolio Performance</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Chart or content */}
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Details</Button>
  </CardFooter>
</Card>

// Different variants
<Card variant="gradient" padding="lg">
  <CardTitle>Total Portfolio Value</CardTitle>
  <h2 className="text-4xl font-bold">$125,000</h2>
</Card>

// No padding
<Card padding="none">
  <img src="/image.jpg" alt="Cover" />
  <div className="p-6">
    <CardTitle>Image Card</CardTitle>
  </div>
</Card>
```

**Props:**

**Card:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'bordered' \| 'gradient'` | `'default'` | Card style variant |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Card padding |

**CardTitle:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'` | HTML heading element |

---

### Modal

An accessible modal dialog with overlay, animations, and keyboard support.

**Features:**
- ✅ Backdrop blur
- ✅ Close on Escape key
- ✅ Close on overlay click
- ✅ Body scroll lock
- ✅ Smooth animations (Framer Motion)
- ✅ Accessible (ARIA attributes)

**Usage:**

```tsx
import { Modal, ModalBody, ModalFooter, Button } from '@/components/ui';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        size="md"
      >
        <ModalBody>
          <p>This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

// Modal without header
<Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
  <ModalBody>
    <h3 className="text-xl font-bold mb-4">Custom Header</h3>
    <p>Modal content</p>
  </ModalBody>
</Modal>

// Different sizes
<Modal size="sm">Small modal</Modal>
<Modal size="md">Medium modal</Modal>
<Modal size="lg">Large modal</Modal>
<Modal size="xl">Extra large modal</Modal>
<Modal size="full">Full width modal</Modal>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | **Required.** Modal open state |
| `onClose` | `() => void` | - | **Required.** Close handler |
| `title` | `string` | - | Modal title |
| `description` | `string` | - | Modal description |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `showCloseButton` | `boolean` | `true` | Show X button in header |
| `closeOnOverlayClick` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |

---

## 🎨 Design Tokens

### Colors

```css
--background: #0a0a0a;
--background-elevated: #1a1a1a;
--foreground: #ffffff;
--foreground-secondary: #a1a1a1;
--accent-primary: #10b981;      /* Emerald */
--border-primary: #262626;
```

### Border Radius

```css
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
```

### Spacing

- `sm`: `p-4` (16px)
- `md`: `p-6` (24px)
- `lg`: `p-8` (32px)

---

## 🧩 Component Composition

Components are designed to be composable:

```tsx
<Card variant="elevated">
  <CardHeader>
    <div className="flex items-center gap-3">
      <TrendingUp className="w-5 h-5 text-emerald-400" />
      <CardTitle>Portfolio Performance</CardTitle>
    </div>
    <Button size="sm" variant="ghost">
      View All
    </Button>
  </CardHeader>

  <CardContent>
    {/* Your chart or content */}
  </CardContent>

  <CardFooter>
    <Button variant="outline" fullWidth>
      Export Report
    </Button>
  </CardFooter>
</Card>
```

---

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Sufficient color contrast

---

## 🚀 Best Practices

### Do's ✅

- Use semantic variants (`primary`, `secondary`, not `green`, `blue`)
- Compose components (`Card` + `CardHeader` + `CardContent`)
- Pass className for custom styling
- Use size props instead of custom padding
- Leverage `forwardRef` for library integration

### Don'ts ❌

- Don't override base styles with `!important`
- Don't nest modals
- Don't use inline styles (use Tailwind classes)
- Don't forget loading states on async actions

---

## 📚 Examples

### Action Buttons Row

```tsx
<div className="flex flex-wrap gap-3">
  <Button icon={Download} variant="gradient-emerald">
    Deposit
  </Button>
  <Button icon={Upload} variant="secondary">
    Withdraw
  </Button>
  <Button icon={RefreshCw} variant="secondary">
    Rebalance
  </Button>
  <Button
    icon={Sparkles}
    iconPosition="right"
    variant="gradient-indigo"
    className="ml-auto"
  >
    Create Strategy
    <ArrowRight className="w-4 h-4" />
  </Button>
</div>
```

### Stats Card

```tsx
<Card variant="gradient">
  <CardDescription>Total Portfolio Value</CardDescription>
  <div className="flex items-baseline gap-3 my-2">
    <h2 className="text-4xl font-bold text-white">$125,000</h2>
    <div className="flex items-center gap-1 text-green-400">
      <TrendingUp className="w-5 h-5" />
      <span className="text-lg font-semibold">+8.5%</span>
    </div>
  </div>
  <CardDescription>
    Total Profit: <span className="text-green-400">+$10,125</span>
  </CardDescription>
</Card>
```

### Confirmation Modal

```tsx
<Modal
  isOpen={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  title="Delete Position"
  description="This action cannot be undone"
  size="sm"
>
  <ModalBody>
    <p className="text-[#a1a1a1]">
      Are you sure you want to withdraw all funds from <strong className="text-white">Aave V3</strong>?
    </p>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleDelete} isLoading={isDeleting}>
      Confirm Delete
    </Button>
  </ModalFooter>
</Modal>
```

---

## 🔧 Extending Components

You can extend components using className:

```tsx
<Button
  variant="primary"
  className="shadow-lg shadow-emerald-500/50 hover:shadow-xl"
>
  Glowing Button
</Button>

<Card
  variant="default"
  className="hover:border-emerald-500/50 transition-colors"
>
  Interactive Card
</Card>
```

---

## 📦 Future Components

Planned components:
- `Input` - Text input with validation
- `Select` - Dropdown select
- `Tabs` - Tab navigation
- `Badge` - Status badges
- `Toast` - Notifications
- `Tooltip` - Hover tooltips
- `Skeleton` - Loading placeholders
- `Alert` - Alert messages

---

**Need help?** Check the [main documentation](../../README.md) or component source code for more details.
