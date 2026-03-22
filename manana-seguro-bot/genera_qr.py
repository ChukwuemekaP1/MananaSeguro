"""
genera_qr.py — Genera el QR de onboarding de Mañana Seguro
Corre: python genera_qr.py
"""

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from PIL import Image, ImageDraw, ImageFont
import os

# ── Cambia esto por el username de tu bot ────────────────────────────────────
BOT_USERNAME = "MxRetiroBot"  # sin @
# ─────────────────────────────────────────────────────────────────────────────

URL = f"https://t.me/{BOT_USERNAME}"

def generar_qr():
    # QR con esquinas redondeadas
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=12,
        border=2,
    )
    qr.add_data(URL)
    qr.make(fit=True)

    img_qr = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        fill_color="#000000",
        back_color="#FFFFFF",
    )

    # Canvas final con branding
    W, H = 600, 750
    canvas = Image.new("RGB", (W, H), "#050505")
    draw = ImageDraw.Draw(canvas)

    # Fondo del QR (blanco con padding)
    qr_size = 400
    qr_resized = img_qr.resize((qr_size, qr_size))
    qr_x = (W - qr_size) // 2
    qr_y = 120

    # Rectángulo blanco detrás del QR
    draw.rounded_rectangle(
        [qr_x - 20, qr_y - 20, qr_x + qr_size + 20, qr_y + qr_size + 20],
        radius=24,
        fill="#FFFFFF"
    )
    canvas.paste(qr_resized, (qr_x, qr_y))

    # Textos
    try:
        font_big   = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 36)
        font_med   = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18)
    except Exception:
        font_big = font_med = font_small = ImageFont.load_default()

    # Título
    draw.text((W//2, 40), "MAÑANA", font=font_big, fill="#FFFFFF", anchor="mm")
    draw.text((W//2, 80), "SEGURO", font=font_big, fill="#3b82f6", anchor="mm")

    # Subtítulo debajo del QR
    y_bottom = qr_y + qr_size + 40
    draw.text((W//2, y_bottom), "Escanea y ahorra para tu retiro", font=font_med, fill="#FFFFFF", anchor="mm")
    draw.text((W//2, y_bottom + 35), "desde $2 USDC · 4.7% APY · sin banco", font=font_small, fill="#6b7280", anchor="mm")

    # URL del bot
    draw.text((W//2, y_bottom + 75), f"t.me/{BOT_USERNAME}", font=font_med, fill="#3b82f6", anchor="mm")

    # Línea decorativa
    draw.line([(60, y_bottom + 110), (W-60, y_bottom + 110)], fill="#1f2937", width=1)

    # Footer
    draw.text((W//2, y_bottom + 135), "Powered by Stellar · Etherfuse · Soroban", font=font_small, fill="#374151", anchor="mm")

    # Guardar
    output = "manana_seguro_qr.png"
    canvas.save(output, "PNG", quality=95)
    print(f"✅ QR generado: {output}")
    print(f"🔗 URL: {URL}")
    return output


if __name__ == "__main__":
    generar_qr()
