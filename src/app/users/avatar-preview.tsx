import Image from "next/image";

type AvatarPreviewProps = {
  src?: string | null;
  size?: number;
  alt?: string;
};

export default function AvatarPreview({
  src,
  size = 120,
  alt = "User avatar",
}: AvatarPreviewProps) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gray-100 text-gray-400"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          width={size}
          height={size}
          alt={alt}
          className="rounded-full object-cover"
          unoptimized
        />
      ) : (
        <span className="text-sm">No Avatar</span>
      )}
    </div>
  );
}
