import QRCode from "qrcode"

export const exportQR = async () => {
    const url = import.meta.env.VITE_PRODUCT_PAGE_URL

    const qrDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
    })

    const link = document.createElement("a")
    link.href = qrDataUrl
    link.download = "ordering-qr.png"
    link.click()
}
