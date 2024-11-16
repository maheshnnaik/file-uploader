### File Upload Component
This is a simple, reusable file upload component built using React and Tailwind CSS. The component supports multiple file uploads, file drag-and-drop, and a tooltip that displays file statuses.

## Features
- **Multiple File Uploads**: Allows users to upload multiple .csv files.
- **Drag-and-Drop Support**: Users can drag and drop files into the upload area.
- **File Validation**: Only .csv files are accepted; non-CSV files are rejected.
- **File Status Display**:
    - `Pending`: File is uploaded but not yet processed.
    - `Success`: File has been successfully processed.
    - `Failed`: File processing has failed.
    - Hover Tooltip: Displays the status of each file when hovering over its icon.
    - Dynamic Status Updates: Simulated file processing updates the status dynamically after a delay.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
