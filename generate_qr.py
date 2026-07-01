"""
二维码生成脚本
- 生成 GitHub 仓库二维码
- 生成项目网页二维码（部署后填入公网URL）
"""
import qrcode
from qrcode.constants import ERROR_CORRECT_H
import os

OUTPUT_DIR = "qr_codes"
os.makedirs(OUTPUT_DIR, exist_ok=True)


def make_qr(url: str, filename: str, title: str):
    """生成高质量二维码（容错率H=30%，适合添加logo）"""
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=10,
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


# === 1. GitHub 仓库二维码 ===
GITHUB_REPO_URL = "https://github.com/SiriusHong-cloud/chuhaibileizhen--waic"
make_qr(GITHUB_REPO_URL, "github_repo.png", "GitHub 仓库二维码")

# === 2. GitHub 仓库 Issues 页面二维码（方便反馈） ===
GITHUB_ISSUES_URL = "https://github.com/SiriusHong-cloud/chuhaibileizhen--waic/issues"
make_qr(GITHUB_ISSUES_URL, "github_issues.png", "GitHub Issues 二维码")

print("=" * 60)
print("GitHub 二维码已生成在 ./qr_codes/ 目录")
print()
print("下一步：项目网页二维码需要先部署到公网，可选方案：")
print("  - Render (推荐，免费套餐, 自动休眠唤醒)")
print("  - Railway (有免费额度)")
print("  - Fly.io (免费额度)")
print("部署成功后，将公网URL填入下方变量重新运行即可生成网页二维码。")
