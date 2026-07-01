"""
生成项目主页二维码（GitHub Pages 部署）
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


# GitHub Pages 正式域名（gh-pages 分支自动部署）
GITHUB_PAGES_URL = "https://siriushong-cloud.github.io/chuhaibileizhen--waic/"
make_qr(GITHUB_PAGES_URL, "project_intro.png", "项目主页二维码 (GitHub Pages)")
