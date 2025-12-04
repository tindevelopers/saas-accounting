"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import Image from "next/image";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

export default function EmailCustomizationPage() {
  const [emailSettings, setEmailSettings] = useState({
    fromName: "SaaS Platform",
    fromEmail: "noreply@example.com",
    replyTo: "support@example.com",
    footerText: "© 2025 SaaS Platform. All rights reserved.",
    headerLogo: "/images/logo/logo.svg",
    headerColor: "#4F46E5",
    footerColor: "#1F2937",
  });

  return (
    <div>
      <PageBreadcrumb pageTitle="Email Customization" />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Email Customization
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Customize email templates and branding
          </p>
        </div>

        {/* Email Settings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Email Settings
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                type="text"
                defaultValue={emailSettings.fromName}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                type="email"
                defaultValue={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="reply-to">Reply-To Email</Label>
              <Input
                id="reply-to"
                type="email"
                defaultValue={emailSettings.replyTo}
                onChange={(e) => setEmailSettings({ ...emailSettings, replyTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Email Header */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Email Header</h2>
          <div className="space-y-4">
            <div>
              <Label>Header Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-16 w-48 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                  <Image
                    src={emailSettings.headerLogo}
                    alt="Header Logo"
                    width={192}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpTrayIcon className="h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="header-color">Header Background Color</Label>
              <div className="mt-2 flex gap-2">
                <input
                  id="header-color"
                  type="color"
                  value={emailSettings.headerColor}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, headerColor: e.target.value })
                  }
                  className="h-11 w-20 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700"
                />
                <Input
                  type="text"
                  value={emailSettings.headerColor}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, headerColor: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email Footer */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Email Footer</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="footer-text">Footer Text</Label>
              <TextArea
                id="footer-text"
                rows={3}
                defaultValue={emailSettings.footerText}
                onChange={(value) => setEmailSettings({ ...emailSettings, footerText: value })}
              />
            </div>
            <div>
              <Label htmlFor="footer-color">Footer Background Color</Label>
              <div className="mt-2 flex gap-2">
                <input
                  id="footer-color"
                  type="color"
                  value={emailSettings.footerColor}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, footerColor: e.target.value })
                  }
                  className="h-11 w-20 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700"
                />
                <Input
                  type="text"
                  value={emailSettings.footerColor}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, footerColor: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email Preview */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Email Preview</h2>
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-800">
            <div
              className="mb-4 p-4 text-white"
              style={{ backgroundColor: emailSettings.headerColor }}
            >
              <Image
                src={emailSettings.headerLogo}
                alt="Logo"
                width={120}
                height={40}
                className="h-10 object-contain"
              />
            </div>
            <div className="mb-4 p-4">
              <p className="text-gray-700 dark:text-gray-300">
                This is a preview of how your emails will look with the current branding settings.
              </p>
            </div>
            <div
              className="p-4 text-white text-sm"
              style={{ backgroundColor: emailSettings.footerColor }}
            >
              {emailSettings.footerText}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Email Settings</Button>
        </div>
      </div>
    </div>
  );
}

