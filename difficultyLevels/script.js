function abrirModeInfo(modeInfo) {
    const spanInfo = document.getElementById(modeInfo)

    spanInfo.style.opacity = spanInfo.style.opacity === '0' ? '1' : '0'
}