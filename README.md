# n8n Dashboard Pro

A comprehensive dashboard for managing n8n workflows with Coda.io-like features. This application provides an all-in-one workspace for document creation, table management, workflow automation, and team collaboration.

## 🌟 Features

### 📊 All-in-One Workspace
- Document-first architecture with embedded components
- Relational tables with cross-references and lookups
- Spreadsheet-like formulas everywhere
- Interactive controls and automation rules
- Real-time collaboration with team members

### 📄 Document Management
- Create and edit rich documents
- Embed tables, charts, and interactive controls
- Version history and rollback capabilities
- Commenting and annotation tools

### 📊 Table & Data Management
- Relational tables with foreign key relationships
- Dynamic updates and computed columns
- Import/export from various formats
- Powerful querying and filtering

### 🧮 Formula System
- Spreadsheet-like formulas across documents and tables
- Math, text, logical, and date functions
- Cross-table references and aggregations
- Real-time formula evaluation

### ⚡ Automation
- Rule-based workflow automation
- Scheduled and event-based triggers
- Custom action execution
- Workflow visualization and monitoring

### 👥 Collaboration
- Real-time multi-user editing
- Granular permissions system
- Activity tracking and audit logs
- Integrated chat and comments

### 🎨 Templates
- Prebuilt template library
- One-click template installation
- Community-contributed templates
- Template customization options

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm
- An n8n instance (local or remote)

### Installation

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Initialize n8n Connection

To connect the dashboard to your n8n instance:

```bash
npm run init:n8n
```

Or manually:
1. Go to the Settings page in the dashboard
2. Enter your n8n URL (e.g., https://your-n8n-instance.com)
3. Generate an API key in your n8n instance:
   - Log in to your n8n instance
   - Go to Settings → API
   - Generate a new Personal Access Token
4. Enter the API key in the dashboard settings
5. Test the connection and save

## 🏗️ Project Structure

```
n8n-dashboard/
├── app/                       # Next.js app router
│   ├── dashboard/            # Main dashboard application
│   │   ├── documents/       # Document management
│   │   ├── tables/          # Table management
│   │   ├── formulas/        # Formula editor
│   │   ├── automation/      # Automation rules
│   │   ├── templates/       # Template library
│   │   ├── workflows/       # Workflow management
│   │   ├── executions/      # Execution tracking
│   │   ├── projects/        # Project organization
│   │   ├── users/           # User management
│   │   ├── documentation/   # Help and documentation
│   │   └── settings/        # Application settings
│   └── ...                  # Landing page and other routes
├── components/              # React components
│   ├── dashboard/           # Dashboard-specific components
│   ├── landing/             # Landing page components
│   ├── ui/                  # Reusable UI components
│   └── ...                  # Specialized components
├── lib/                     # Business logic and utilities
│   ├── n8n-api.ts          # n8n API service
│   ├── mock-data.ts        # Mock data for development
│   └── utils.ts            # Utility functions
├── config/                  # Configuration files
├── scripts/                 # Utility scripts
└── ...                      # Other project files
```

## 🛠️ Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run init:n8n` - Initialize n8n connection

## 🔧 Technologies Used

- [Next.js 15](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) components
- [Radix UI](https://www.radix-ui.com/) primitives
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons

## 📡 n8n API Integration

The dashboard integrates with n8n through its REST API:

- **Workflows**: Create, read, update, delete workflows
- **Executions**: Monitor workflow executions
- **Users**: Manage user accounts
- **Projects**: Organize workflows into projects

## 🧪 Testing

To run tests:

```bash
npm run test
# or
npm run test:watch
```

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Docker Deployment

You can also deploy using Docker:

```bash
# Build the image
docker build -t n8n-dashboard .

# Run the container
docker run -p 3000:3000 n8n-dashboard
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) for the amazing workflow automation tool
- [Next.js](https://nextjs.org/) for the incredible React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
