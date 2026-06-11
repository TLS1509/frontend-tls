import * as React from "react";
import { useState, useCallback } from "react";
import { cn } from "./utils";
import { Upload, X, File, FileText, Image as ImageIcon, Video, Music, Archive, CheckCircle2 } from "lucide-react";
import { Button } from "./button";
import { Progress } from "./progress";

interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onFilesSelected?: (files: File[]) => void;
  onFilesChange?: (files: FileWithPreview[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  showPreview?: boolean;
  variant?: "default" | "compact";
}

export interface FileWithPreview extends File {
  preview?: string;
  id: string;
  progress?: number;
  status?: "uploading" | "complete" | "error";
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      onFilesSelected,
      onFilesChange,
      accept,
      multiple = true,
      maxSize = 10,
      maxFiles = 5,
      disabled = false,
      showPreview = true,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const getFileIcon = (file: File) => {
      const type = file.type;
      if (type.startsWith("image/")) return ImageIcon;
      if (type.startsWith("video/")) return Video;
      if (type.startsWith("audio/")) return Music;
      if (type.includes("pdf") || type.includes("document")) return FileText;
      if (type.includes("zip") || type.includes("rar")) return Archive;
      return File;
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const processFiles = useCallback(
      (fileList: FileList) => {
        const newFiles = Array.from(fileList).map((file) => {
          const fileWithPreview = file as FileWithPreview;
          fileWithPreview.id = Math.random().toString(36).substring(7);
          
          // Create preview for images
          if (file.type.startsWith("image/") && showPreview) {
            fileWithPreview.preview = URL.createObjectURL(file);
          }

          // Simulate upload progress
          fileWithPreview.progress = 0;
          fileWithPreview.status = "uploading";
          
          return fileWithPreview;
        });

        // Check max files
        const totalFiles = files.length + newFiles.length;
        if (totalFiles > maxFiles) {
          alert(`Vous ne pouvez télécharger que ${maxFiles} fichiers maximum.`);
          return;
        }

        // Check file size
        const oversizedFiles = newFiles.filter((file) => file.size > maxSize * 1024 * 1024);
        if (oversizedFiles.length > 0) {
          alert(`Certains fichiers dépassent la taille maximale de ${maxSize}MB.`);
          return;
        }

        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesSelected?.(newFiles);
        onFilesChange?.(updatedFiles);

        // Simulate upload progress
        newFiles.forEach((file) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
              clearInterval(interval);
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === file.id ? { ...f, progress: 100, status: "complete" } : f
                )
              );
            } else {
              setFiles((prev) =>
                prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
              );
            }
          }, 200);
        });
      },
      [files, maxFiles, maxSize, onFilesSelected, onFilesChange, showPreview]
    );

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const { files: droppedFiles } = e.dataTransfer;
        if (droppedFiles) {
          processFiles(droppedFiles);
        }
      },
      [disabled, processFiles]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleFileInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files: selectedFiles } = e.target;
        if (selectedFiles) {
          processFiles(selectedFiles);
        }
      },
      [processFiles]
    );

    const removeFile = (id: string) => {
      const updatedFiles = files.filter((f) => f.id !== id);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && inputRef.current?.click()}
          className={cn(
            "relative cursor-pointer rounded-[var(--radius-lg)] border-2 border-dashed transition-all",
            isDragging && "border-primary bg-primary/5 scale-[1.01]",
            !isDragging && "border-border hover:border-primary/50 hover:bg-muted/50",
            disabled && "opacity-50 cursor-not-allowed",
            variant === "default" && "p-12",
            variant === "compact" && "p-6"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
            aria-label="Upload de fichiers"
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className={cn(
              "rounded-full bg-primary/10 p-4",
              variant === "compact" && "p-3"
            )}>
              <Upload className={cn(
                "text-primary",
                variant === "default" && "h-8 w-8",
                variant === "compact" && "h-6 w-6"
              )} />
            </div>
            
            {variant === "default" ? (
              <>
                <div>
                  <p className="mb-1">
                    <span className="font-medium text-primary">Cliquez pour télécharger</span> ou glissez-déposez
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {accept ? accept.split(",").join(", ") : "Tous les fichiers"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Taille max: {maxSize}MB • Max {maxFiles} fichier{maxFiles > 1 ? "s" : ""}
                </p>
              </>
            ) : (
              <p className="text-sm">
                <span className="font-medium text-primary">Télécharger</span> ou glissez-déposez
              </p>
            )}
          </div>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => {
              const Icon = getFileIcon(file);
              
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 rounded-[var(--radius-lg)] border p-3"
                >
                  {/* Preview or icon */}
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-12 w-12 rounded-[var(--radius-md)] object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-muted">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{file.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                      {file.status === "complete" && (
                        <div className="flex items-center gap-1 text-xs text-success">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Terminé</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Progress bar */}
                    {file.status === "uploading" && file.progress !== undefined && (
                      <Progress value={file.progress} className="mt-2 h-1" />
                    )}
                  </div>

                  {/* Remove button */}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeFile(file.id)}
                    aria-label="Supprimer le fichier"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";

export { FileUpload };
