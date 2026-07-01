"""
生成项目介绍页二维码
使用 htmlpreview.github.io 服务，无需手动开启 GitHub Pages
"""
import qrcode
from qrcode.constants import ERROR_CORRECT_H
import os

OUTPUT_DIR = "qr_codes"
os.makedirs(OUTPUT_DIR, exist_ok=True)


def make_qr(url: str, filename: str, title: str):
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=12,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    out_path = os.path.join(OUTPUT_DIR, filename)
    img.save(out_path)
    print(f"[OK] {title}")
    print(f"     URL: {url}")
    print(f"     文件: {out_path}")
    print(f"     尺寸: {img.size[0]}x{img.size[1]}px")
    print()


# 方案1：htmlpreview.github.io - 直接渲染GitHub HTML，无需任何配置
INTRO_URL = "https://htmlpreview.github.io/?https://github.com/SiriusHong-cloud/chuhaibileizhen--waic/blob/main/docs/index.html"
make_qr(INTRO_URL, "project_intro.png", "项目介绍页二维码 (htmlpreview)")
