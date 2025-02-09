// 文件上传处理
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const progressBar = document.getElementById('progressBar');

// 拖放事件处理
dropZone.ondragover = (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
};

dropZone.ondragleave = () => {
    dropZone.classList.remove('dragover');
};

dropZone.ondrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
};

fileInput.onchange = (e) => handleFile(e.target.files[0]);

// 文件处理函数
async function handleFile(file) {
    if (!file) return;

    progressBar.style.opacity = '1';
    
    try {
        // 示例：调用后端API（需替换为真实API）
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('https://your-api.com/check', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('检测失败');
        
        const result = await response.json();
        showResult(result);
    } catch (error) {
        alert(error.message);
    } finally {
        progressBar.style.opacity = '0';
    }
}

// 结果显示
function showResult(data) {
    const resultSection = document.getElementById('result');
    resultSection.hidden = false;
    
    document.getElementById('resultContent').innerHTML = `
        <p>总体相似度：<strong>${data.similarity}%</strong></p>
        <details>
            <summary>详细报告</summary>
            <pre>${JSON.stringify(data.details, null, 2)}</pre>
        </details>
    `;
}