import os
from PIL import Image

FOLDER = "paintings"
MAX_SIZE = (800, 800)  # Maximum width/height in pixels


def main() -> int:
    for filename in os.listdir(FOLDER):
        # Skip existing SD files or non-image files
        if "-SD." in filename or not filename.lower().endswith(
            (".png", ".jpg", ".jpeg", ".webp")
        ):
            continue

        filepath = os.path.join(FOLDER, filename)
        name, ext = os.path.splitext(filename)
        sd_path = os.path.join(FOLDER, f"{name}-SD{ext}")

        # Only generate if the SD file doesn't exist yet
        if not os.path.exists(sd_path):
            with Image.open(filepath) as img:
                img.thumbnail(MAX_SIZE)
                # Preserve transparency for PNGs, convert mode if needed
                if img.mode in ("RGBA", "P") and ext.lower() in [".jpg", ".jpeg"]:
                    img = img.convert("RGB")
                img.save(sd_path, optimize=True, quality=80)
                print(f"✓ Created: {sd_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
