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
    <div className="avatar-preview" style={{ width: size, height: size }}>
      {src ? (
        <Image
          src={src}
          width={size}
          height={size}
          alt={alt}
          className="avatar-image"
          unoptimized
        />
      ) : (
        <span>No avatar</span>
      )}
    </div>
  );
}
