const sourceText = document.getElementById("sourceText");
const resultText = document.getElementById("resultText");
const modeSelect = document.getElementById("modeSelect");
const minifyBtn = document.getElementById("minifyBtn");
const clearBtn = document.getElementById("clearBtn");
const rawBtn = document.getElementById("rawBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const inputCount = document.getElementById("inputCount");
const outputCount = document.getElementById("outputCount");
const savedCount = document.getElementById("savedCount");
const statusText = document.getElementById("statusText");

const symbolDensityRegex = /[{}\[\];:=<>\/+\-*&|!]/g;

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const setStatus = (message) => {
    statusText.textContent = message;
};

const detectMode = (input) => {
    const symbolCount = (input.match(symbolDensityRegex) || []).length;
    const score = symbolCount / Math.max(input.length, 1);
    return score > 0.04 ? "code" : "text";
};

const minifyText = (input) => input.replace(/\s+/g, " ").trim();

const minifyCode = (input) => {
    const normalized = input.replace(/\r\n?/g, "\n");
    const blockCommentsRemoved = normalized.replace(/\/\*[\s\S]*?\*\//g, "");
    const lineCommentsRemoved = blockCommentsRemoved.replace(/(^|[^:\\])\/\/.*$/gm, "$1");

    return lineCommentsRemoved
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join(" ")
        .replace(/\s*([{}\[\];(),:+\-*/%<>=!&|?])\s*/g, "$1")
        .replace(/\s{2,}/g, " ")
        .trim();
};

const updateMetrics = () => {
    const inputLength = sourceText.value.length;
    const outputLength = resultText.value.length;
    const saved = inputLength > 0 ? Math.max(0, ((inputLength - outputLength) / inputLength) * 100) : 0;

    inputCount.textContent = formatNumber(inputLength);
    outputCount.textContent = formatNumber(outputLength);
    savedCount.textContent = `${saved.toFixed(1)}%`;
};

const runMinify = () => {
    const input = sourceText.value;

    if (!input.trim()) {
        setStatus("Add some content first.");
        resultText.value = "";
        updateMetrics();
        sourceText.focus();
        return;
    }

    const selectedMode = modeSelect.value;
    const modeToUse = selectedMode === "smart" ? detectMode(input) : selectedMode;
    const output = modeToUse === "code" ? minifyCode(input) : minifyText(input);

    resultText.value = output;
    setStatus(`Minified in ${modeToUse} mode.`);
    updateMetrics();
};

const clearAll = () => {
    sourceText.value = "";
    resultText.value = "";
    setStatus("Reset complete.");
    updateMetrics();
    sourceText.focus();
};

const openRawOutput = () => {
    if (!resultText.value) {
        setStatus("Generate output before opening raw view.");
        return;
    }

    const rawWindow = window.open("", "_blank", "top=20,left=20,width=760,height=540");
    if (!rawWindow) {
        setStatus("Popup blocked. Allow popups and try again.");
        return;
    }

    const escaped = resultText.value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    rawWindow.document.write(`<pre style="white-space:pre-wrap;font-family:monospace;padding:16px;">${escaped}</pre>`);
    rawWindow.document.title = "AnyMini Raw Output";
};

const copyOutput = async () => {
    if (!resultText.value) {
        setStatus("No output to copy.");
        return;
    }

    try {
        await navigator.clipboard.writeText(resultText.value);
        setStatus("Output copied to clipboard.");
    } catch (error) {
        resultText.focus();
        resultText.select();
        setStatus("Clipboard access failed. Output selected for manual copy.");
    }
};

const downloadOutput = () => {
    if (!resultText.value) {
        setStatus("No output to download.");
        return;
    }

    const blob = new Blob([resultText.value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `anymini-output-${Date.now()}.txt`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    setStatus("Output downloaded.");
};

sourceText.addEventListener("input", () => {
    setStatus("Typing...");
    updateMetrics();
});

resultText.addEventListener("click", () => {
    if (resultText.value) {
        resultText.focus();
        resultText.select();
    }
});

minifyBtn.addEventListener("click", runMinify);
clearBtn.addEventListener("click", clearAll);
rawBtn.addEventListener("click", openRawOutput);
copyBtn.addEventListener("click", copyOutput);
downloadBtn.addEventListener("click", downloadOutput);

sourceText.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        runMinify();
    }
});

updateMetrics();
