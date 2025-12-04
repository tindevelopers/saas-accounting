"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Switch from "@/components/form/switch/Switch";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Domain {
  id: string;
  domain: string;
  type: "primary" | "custom";
  status: "active" | "pending" | "failed";
  sslStatus: "valid" | "expired" | "pending";
  verified: boolean;
}

const domains: Domain[] = [
  {
    id: "1",
    domain: "app.example.com",
    type: "primary",
    status: "active",
    sslStatus: "valid",
    verified: true,
  },
  {
    id: "2",
    domain: "custom.example.com",
    type: "custom",
    status: "pending",
    sslStatus: "pending",
    verified: false,
  },
];

const statusIcons = {
  active: CheckIcon,
  pending: CheckIcon,
  failed: XMarkIcon,
};

const statusColors = {
  active: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-500",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-500",
  failed: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-500",
};

export default function DomainSettingsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    domain: "",
    type: "custom" as "primary" | "custom",
  });
  const [enableCustomDomain, setEnableCustomDomain] = useState(true);

  return (
    <div>
      <PageBreadcrumb pageTitle="Domain Settings" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Domain Settings</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Configure custom domains and SSL certificates
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>Add Domain</Button>
        </div>

        {/* Enable Custom Domain */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-custom">Enable Custom Domains</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow customers to use their own domains
              </p>
            </div>
            <Switch
              id="enable-custom"
              defaultChecked={enableCustomDomain}
              onChange={(checked) => setEnableCustomDomain(checked)}
            />
          </div>
        </div>

        {showForm && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Add Domain</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain-name">Domain Name</Label>
                <Input
                  id="domain-name"
                  type="text"
                  defaultValue={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="example.com"
                />
              </div>
              <div>
                <Label htmlFor="domain-type">Domain Type</Label>
                <select
                  id="domain-type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as "primary" | "custom" })
                  }
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
                >
                  <option value="primary">Primary</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button>Add Domain</Button>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {domains.map((domain) => {
            const Icon = statusIcons[domain.status];
            return (
              <div
                key={domain.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {domain.domain}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{domain.type}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[domain.status]}`}
                  >
                    <Icon className="h-3 w-3" />
                    {domain.status}
                  </span>
                </div>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">SSL Status</span>
                    <span
                      className={`font-medium ${
                        domain.sslStatus === "valid"
                          ? "text-green-600 dark:text-green-500"
                          : domain.sslStatus === "pending"
                          ? "text-yellow-600 dark:text-yellow-500"
                          : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {domain.sslStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Verified</span>
                    {domain.verified ? (
                      <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-500" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {!domain.verified && (
                  <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-500/10">
                    <p className="text-xs text-yellow-800 dark:text-yellow-300">
                      Add this CNAME record to your DNS: <code className="font-mono">app.example.com</code>
                    </p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configure DNS
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Renew SSL
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

