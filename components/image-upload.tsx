"use client"

import { useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Upload, X, Loader2, ImageIcon, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_BASE } from "@/lib/backend"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  /** Current image URL (may be a /uploads/... path or an external URL) */
  value: string
  /** Called with the final URL after upload or manual entry */
  onChange: (url: string) => void
  /** Label shown above the widget */
  label?: string
  /** Compact mode for fields that don't need a large preview */
  compact?: boolean
}

/**
 * Drag-and-drop / click-to-upload image widget.
 *
 * Flow:
 *  1. User clicks or drags a file onto the dropzone
 *  2. Component POSTs the file to POST /api/upload (multipart)
 *  3. Flask saves the file to public/uploads/<uuid>.<ext>
 *  4. Flask returns { url: "/uploads/<uuid>.<ext>" }
 *  5. Component calls onChange(url) → parent stores URL in form state
 *  6. The URL is later sent with the create/update form payload and saved in the DB
 *
 * Users can also paste an external URL directly using the small URL tab.
 */
export function ImageUpload({ value, onChange, label, compact = false }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [mode, setMode] = useState<"drop" | "url">("drop")
  const [urlInput, setUrlInput] = useState(value?.startsWith("http") ? value : "")

  const uploadFile = useCallback(
    async (file: File) => {
      // Quick client-side check
      const allowed = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml", "image/avif"]
      if (!allowed.includes(file.type)) {
        toast.error("Unsupported file type. Use PNG, JPG, GIF, WEBP, SVG or AVIF.")
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large. Maximum size is 10 MB.")
        return
      }

      setUploading(true)
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("uless_auth_token") : null
        const fd = new FormData()
        fd.append("file", file)

        const res = await fetch(`${API_BASE}/api/upload/`, {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: fd,
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Upload failed")

        onChange(data.url)
        toast.success("Image uploaded successfully")
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Upload failed")
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
    // reset so the same file can be re-selected after clearing
    e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  const handleUrlCommit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      toast.success("Image URL saved")
    }
  }

  const clearImage = () => {
    onChange("")
    setUrlInput("")
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#333]">{label}</span>
          {/* Toggle between file upload and direct URL */}
          <button
            type="button"
            onClick={() => setMode(mode === "drop" ? "url" : "drop")}
            className="text-xs text-[#5B48D9] hover:underline flex items-center gap-1"
          >
            {mode === "drop" ? <><Link className="h-3 w-3" /> Use URL instead</> : <><Upload className="h-3 w-3" /> Upload file instead</>}
          </button>
        </div>
      )}

      {/* ── URL input mode ── */}
      {mode === "url" && (
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlCommit())}
            className="h-11 rounded-xl border-gray-200 text-sm"
          />
          <Button type="button" onClick={handleUrlCommit} variant="outline" className="h-11 rounded-xl shrink-0">
            Apply
          </Button>
        </div>
      )}

      {/* ── Drop zone mode ── */}
      {mode === "drop" && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-2xl transition-all cursor-pointer group",
            compact ? "h-24" : "h-40",
            dragOver
              ? "border-[#5B48D9] bg-[#5B48D9]/5"
              : value
              ? "border-gray-200 bg-gray-50"
              : "border-gray-200 hover:border-[#5B48D9]/50 hover:bg-[#5B48D9]/3 bg-gray-50/50"
          )}
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {/* hidden file input */}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml,image/avif"
            onChange={handleFileChange}
          />

          {/* loading overlay */}
          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-2xl z-10">
              <Loader2 className="h-7 w-7 text-[#5B48D9] animate-spin mb-1" />
              <span className="text-xs font-medium text-[#5B48D9]">Uploading…</span>
            </div>
          )}

          {/* image preview */}
          {value && !uploading ? (
            <div className="relative w-full h-full">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-cover rounded-2xl"
                unoptimized
              />
              {/* clear button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearImage() }}
                className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
              {/* re-upload hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-2xl">
                <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">
                  Click or drop to replace
                </span>
              </div>
            </div>
          ) : !uploading ? (
            /* empty state */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 p-4">
              <div className={cn(
                "rounded-xl bg-gray-100 flex items-center justify-center",
                compact ? "h-8 w-8" : "h-12 w-12"
              )}>
                <ImageIcon className={cn("text-gray-400", compact ? "h-4 w-4" : "h-6 w-6")} />
              </div>
              {!compact && (
                <>
                  <p className="text-sm font-medium text-gray-500">
                    Drop image here or <span className="text-[#5B48D9]">click to browse</span>
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF, WEBP, SVG · Max 10 MB</p>
                </>
              )}
              {compact && (
                <p className="text-xs text-gray-400 text-center">Click or drop</p>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* show the stored URL below the widget for reference */}
      {value && (
        <p className="text-xs text-gray-400 truncate">
          Saved: <span className="font-mono text-[#5B48D9]">{value}</span>
        </p>
      )}
    </div>
  )
}
