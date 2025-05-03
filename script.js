// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Multi-step form navigation
    const pages = document.querySelectorAll('.form-page');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLine = document.getElementById('progressLine');
    let currentPage = 1;
    const totalPages = pages.length;
    
    // Initialize form navigation
    document.querySelectorAll('.next-button, .prev-button').forEach(button => {
        button.addEventListener('click', function() {
            const nextPage = this.dataset.next;
            const prevPage = this.dataset.prev;
            
            if (nextPage) {
                // Simple validation before proceeding
                if (validateCurrentPage(currentPage)) {
                    navigateToPage(parseInt(nextPage));
                }
            } else if (prevPage) {
                navigateToPage(parseInt(prevPage));
            }
        });
    });
    
    function navigateToPage(pageNumber) {
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show selected page
        document.getElementById(`page${pageNumber}`).classList.add('active');
        
        // Update progress steps
        updateProgress(pageNumber);
        
        // Update current page
        currentPage = pageNumber;
        
        // If it's the last page, update the preview
        if (pageNumber === 5) {
            updatePreview();
        }
        
        // Scroll to top
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    function updateProgress(pageNumber) {
        // Update progress indicators
        progressSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            if (stepNum <= pageNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update progress line
        const progressPercentage = ((pageNumber - 1) / (totalPages - 1)) * 100;
        progressLine.style.width = `${progressPercentage}%`;
    }
    
    function validateCurrentPage(pageNumber) {
        // Add validation logic for each page
        switch(pageNumber) {
            case 1:
                // Patient info validation
                const name = document.getElementById('patientName').value;
                const age = document.getElementById('age').value;
                const phone = document.getElementById('phone').value;
                
                if (!name || !age || !phone) {
                    alert('Please fill in all required fields');
                    return false;
                }
                return true;
                
            case 2:
                // Prescription details - no mandatory fields
                return true;
                
            case 3:
                // Lens & frame validation
                const lensType = document.getElementById('lensType').value;
                const frameType = document.getElementById('frameType').value;
                
                if (!lensType || !frameType) {
                    alert('Please select a lens type and frame type');
                    return false;
                }
                return true;
                
            case 4:
                // Payment info - no mandatory fields
                return true;
                
            default:
                return true;
        }
    }
    
    function updatePreview() {
        // Update patient info preview
        document.getElementById('previewName').textContent = document.getElementById('patientName').value || '-';
        document.getElementById('previewAge').textContent = document.getElementById('age').value || '-';
        document.getElementById('previewPhone').textContent = document.getElementById('phone').value || '-';
        document.getElementById('previewAddress').textContent = document.getElementById('address').value || '-';
        
        // Update prescription preview
        document.getElementById('previewReSphere').textContent = document.getElementById('reSphere').value || '-';
        document.getElementById('previewReCylinder').textContent = document.getElementById('reCylinder').value || '-';
        document.getElementById('previewReAxis').textContent = document.getElementById('reAxis').value || '-';
        document.getElementById('previewRePd').textContent = document.getElementById('rePd').value || '-';
        
        document.getElementById('previewLeSphere').textContent = document.getElementById('leSphere').value || '-';
        document.getElementById('previewLeCylinder').textContent = document.getElementById('leCylinder').value || '-';
        document.getElementById('previewLeAxis').textContent = document.getElementById('leAxis').value || '-';
        document.getElementById('previewLePd').textContent = document.getElementById('lePd').value || '-';
        
        // Update lens & frame preview
        document.getElementById('previewLensType').textContent = document.getElementById('lensType').value || '-';
        document.getElementById('previewLensQuality').textContent = document.getElementById('lensQuality').value || '-';
        document.getElementById('previewFrameType').textContent = document.getElementById('frameType').value || '-';
        document.getElementById('previewFrameModel').textContent = document.getElementById('frameModel').value || '-';
        document.getElementById('previewAntiReflective').textContent = document.getElementById('antiReflectiveCoating').checked ? 'Yes' : 'No';
        document.getElementById('previewUvProtection').textContent = document.getElementById('uvProtection').checked ? 'Yes' : 'No';
        
        // Update payment preview
        const total = parseFloat(document.getElementById('totalAmount').value) || 0;
        const collected = parseFloat(document.getElementById('collectedAmount').value) || 0;
        const remaining = calculateRemainingAmount();
        
        document.getElementById('previewTotal').textContent = total ? `NPR ${total.toLocaleString()}` : '-';
        document.getElementById('previewCollected').textContent = collected ? `NPR ${collected.toLocaleString()}` : '-';
        document.getElementById('previewRemaining').textContent = remaining ? `NPR ${remaining.toLocaleString()}` : '-';
        document.getElementById('previewPaymentMethod').textContent = document.getElementById('paymentMethod').value || '-';
        document.getElementById('previewDeliveryDate').textContent = document.getElementById('deliveryDate').value || '-';
    }
    
    // Payment calculation functions
    function calculateRemainingAmount() {
        const total = parseFloat(document.getElementById('totalAmount').value) || 0;
        const collected = parseFloat(document.getElementById('collectedAmount').value) || 0;
        return Math.max(0, total - collected);
    }
    
    function updatePaymentDisplay() {
        const total = parseFloat(document.getElementById('totalAmount').value) || 0;
        const collected = parseFloat(document.getElementById('collectedAmount').value) || 0;
        const remaining = calculateRemainingAmount();
        
        if (total > 0) {
            document.getElementById('paymentDisplay').style.display = 'block';
            document.getElementById('displayTotal').textContent = `NPR ${total.toLocaleString()}`;
            document.getElementById('displayCollected').textContent = `NPR ${collected.toLocaleString()}`;
            document.getElementById('displayRemaining').textContent = `NPR ${remaining.toLocaleString()}`;
        } else {
            document.getElementById('paymentDisplay').style.display = 'none';
        }
    }
    
    // Set up event listeners for payment fields
    document.getElementById('totalAmount').addEventListener('input', updatePaymentDisplay);
    document.getElementById('collectedAmount').addEventListener('input', updatePaymentDisplay);
    
    // Generate a random bill number
    function generateBillNumber() {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `BILL-${year}${month}${day}-${randomNum}`;
    }
    
    // Format date in Nepali style (YYYY-MM-DD)
    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    
    // Format current date
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Close bill view
    function closeBill() {
        document.getElementById('billTemplate').style.display = 'none';
        document.getElementById('prescriptionForm').reset();
        document.getElementById('paymentDisplay').style.display = 'none';
        document.getElementById('successMessage').style.display = 'none';
        navigateToPage(1); // Return to first page
    }
    
    // Form submission
    document.getElementById('prescriptionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            patientName: document.getElementById('patientName').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            reSphere: document.getElementById('reSphere').value,
            reCylinder: document.getElementById('reCylinder').value,
            reAxis: document.getElementById('reAxis').value,
            rePd: document.getElementById('rePd').value,
            leSphere: document.getElementById('leSphere').value,
            leCylinder: document.getElementById('leCylinder').value,
            leAxis: document.getElementById('leAxis').value,
            lePd: document.getElementById('lePd').value,
            lensType: document.getElementById('lensType').value,
            lensQuality: document.getElementById('lensQuality').value,
            frameType: document.getElementById('frameType').value,
            frameModel: document.getElementById('frameModel').value,
            antiReflective: document.getElementById('antiReflectiveCoating').checked,
            uvProtection: document.getElementById('uvProtection').checked,
            paymentMethod: document.getElementById('paymentMethod').value,
            totalAmount: document.getElementById('totalAmount').value,
            collectedAmount: document.getElementById('collectedAmount').value,
            remainingAmount: calculateRemainingAmount(),
            deliveryDate: document.getElementById('deliveryDate').value,
            notes: document.getElementById('notes').value,
            sendSms: document.getElementById('smsConfirmation').checked
        };
        
        // Generate SMS message
        const smsMessage = generateSMS(formData);
        
        // In a real implementation, you would send this via an SMS API
        console.log("SMS to patient:", smsMessage);
        console.log("Form data:", formData);
        
        // Show success message
        const successMsg = document.getElementById('successMessage');
        successMsg.style.display = 'block';
        
        // Generate and display bill
        generateBill(formData);
    });
    
    function generateBill(formData) {
        // Fill bill template with data
        document.getElementById('billDate').textContent = getCurrentDate();
        document.getElementById('billNumber').textContent = generateBillNumber();
        
        document.getElementById('billPatientName').textContent = formData.patientName || '-';
        document.getElementById('billPatientAge').textContent = formData.age || '-';
        document.getElementById('billPatientPhone').textContent = formData.phone || '-';
        document.getElementById('billPatientAddress').textContent = formData.address || '-';
        
        document.getElementById('billReSphere').textContent = formData.reSphere || '-';
        document.getElementById('billReCylinder').textContent = formData.reCylinder || '-';
        document.getElementById('billReAxis').textContent = formData.reAxis || '-';
        document.getElementById('billRePd').textContent = formData.rePd || '-';
        
        document.getElementById('billLeSphere').textContent = formData.leSphere || '-';
        document.getElementById('billLeCylinder').textContent = formData.leCylinder || '-';
        document.getElementById('billLeAxis').textContent = formData.leAxis || '-';
        document.getElementById('billLePd').textContent = formData.lePd || '-';
        
        document.getElementById('billLensType').textContent = formData.lensType || '-';
        document.getElementById('billLensQuality').textContent = formData.lensQuality || '-';
        document.getElementById('billFrameType').textContent = formData.frameType || '-';
        document.getElementById('billFrameModel').textContent = formData.frameModel || '-';
        document.getElementById('billAntiReflective').textContent = formData.antiReflective ? 'Yes' : 'No';
        document.getElementById('billUvProtection').textContent = formData.uvProtection ? 'Yes' : 'No';
        
        document.getElementById('billTotalAmount').textContent = formData.totalAmount ? `NPR ${formData.totalAmount}` : 'NPR 0';
        document.getElementById('billPaidAmount').textContent = formData.collectedAmount ? `NPR ${formData.collectedAmount}` : 'NPR 0';
        document.getElementById('billDueAmount').textContent = formData.remainingAmount ? `NPR ${formData.remainingAmount}` : 'NPR 0';
        document.getElementById('billPaymentMethod').textContent = formData.paymentMethod || '-';
        document.getElementById('billDeliveryDate').textContent = formatDate(formData.deliveryDate);
        
        document.getElementById('billNotes').textContent = formData.notes || 'None';
        
        // Show the bill
        document.getElementById('billTemplate').style.display = 'block';
        
        // Scroll to bill
        document.getElementById('billTemplate').scrollIntoView({ behavior: 'smooth' });
    }
    
    function generateSMS(data) {
        let paymentInfo = '';
        if (data.totalAmount) {
            paymentInfo = `\nPayment: NPR ${data.totalAmount} (Paid: NPR ${data.collectedAmount}, Due: NPR ${data.remainingAmount})`;
        }
        
        let deliveryInfo = '';
        if (data.deliveryDate) {
            deliveryInfo = `\nReady for pickup: ${formatDate(data.deliveryDate)}`;
        }
        
        let additionalFeatures = [];
        if (data.antiReflective) additionalFeatures.push("Anti-Reflective Coating");
        if (data.uvProtection) additionalFeatures.push("UV Protection");
        
        let featuresInfo = '';
        if (additionalFeatures.length > 0) {
            featuresInfo = `\nAdditional Features: ${additionalFeatures.join(", ")}`;
        }
        
        return `Mai Opticals Prescription\n\n` +
               `Patient: ${data.patientName} (${data.age})\n` +
               `Phone: ${data.phone}\n\n` +
               `Right Eye: SPH ${data.reSphere || '-'}, CYL ${data.reCylinder || '-'}, Axis ${data.reAxis || '-'}, PD ${data.rePd || '-'}\n` +
               `Left Eye: SPH ${data.leSphere || '-'}, CYL ${data.leCylinder || '-'}, Axis ${data.leAxis || '-'}, PD ${data.lePd || '-'}\n\n` +
               `Lens: ${data.lensType} (${data.lensQuality || 'Standard'})\n` +
               `Frame: ${data.frameType}${data.frameModel ? ' - ' + data.frameModel : ''}` +
               featuresInfo +
               paymentInfo + 
               deliveryInfo + `\n\n` +
               `Notes: ${data.notes || 'None'}\n\n` +
               `Thank you for choosing Mai Opticals, Birgunj!`;
    }
});
