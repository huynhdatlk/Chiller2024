const firebaseConfig = {
    apiKey: "AIzaSyCNpKZpp_RxEfbS8oqQmMYK6J1vVWYragc",
    authDomain: "abcd-3ae17.firebaseapp.com",
    databaseURL: "https://abcd-3ae17-default-rtdb.firebaseio.com",
    projectId: "abcd-3ae17",
    storageBucket: "abcd-3ae17.appspot.com",
    messagingSenderId: "429290291148",
    appId: "1:429290291148:web:34499c621fda6ac3176769",
    measurementId: "G-VQ5XB1VEGY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRefMonitor = firebase.database().ref("monitor");
const dbRefControl = firebase.database().ref("control");


export function checkfault() {
    var selectedOption = document.querySelector('input[name="options"]:checked').id;
    const monitoredVariables = ["LP", "HP", "CO", "PO", "L1", "L2", "L3","ALARM_LIQUID_TEMP_HIGH","WARN_LIQUID_TEMP_LOW"];
    let dbRefMonitorCOMP = firebase.database().ref("monitor/COMP/data");
    let dbRefMonitorPUMP = firebase.database().ref("monitor/PUMP/data");
    let dbRefMonitorAuto = firebase.database().ref("monitor/MODE/AUTO/data");
    let dbRefMonitorManual = firebase.database().ref("monitor/MODE/MANUAL/data");
    let dbRefControlCOMP = firebase.database().ref("control/mode/buttonCOMP");
    let dbRefControlPUMP = firebase.database().ref("control/mode/buttonPUMP");
    let dbRefControlAuto = firebase.database().ref("control/mode/AUTO");
    let dbRefControlManual = firebase.database().ref("control/mode/MANUAL");

    monitoredVariables.forEach(variable => {

         if (variable == "ALARM_LIQUID_TEMP_HIGH") {
            dbRefMonitor.child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();
                        let isErrorHTL = JSON.parse(localStorage.getItem("isErrorHTL"));
                        // co loi tat COMP
                        if (val == 0) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                                pumpOffField.checked = true;
                            }
                            localStorage.setItem("isErrorHTL", true)
                            dbRefControlPUMP.set(0);
                            dbRefControlCOMP.set(0);
                            compLight.style.backgroundColor = "red";
                           
                        }
                        // da sua loi bat COMP
                        if (ControlAutoValue == 1 && val == 1 && isErrorHTL == true) {
                            dbRefControlPUMP.set(1);
                            localStorage.setItem("isErrorHTL", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "L1") {
            dbRefMonitor.child("3phase_fault").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();
                        let isErrorL1 = JSON.parse(localStorage.getItem("isErrorL1"));
                        // co loi tat COMP
                        if (val == 1) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                                pumpOffField.checked = true;
                            }

                            localStorage.setItem("isErrorL1", true)
                            dbRefControlPUMP.set(0);
                            dbRefControlCOMP.set(0);
                            compLight.style.backgroundColor = "red";
                            alert(" L1 Error - Comp and Pump stop");
                        }
                        // da sua loi bat COMP
                        if (ControlAutoValue == 1 && val == 0 && isErrorL1 == true) {
                            dbRefControlPUMP.set(1);
                            localStorage.setItem("isErrorL1", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "L2") {
            dbRefMonitor.child("3phase_fault").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();
                        let isErrorL2 = JSON.parse(localStorage.getItem("isErrorL2"));

                        if (val == 1) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                                pumpOffField.checked = true;
                            }
                            localStorage.setItem("isErrorL2", true)

                            dbRefControlPUMP.set(0);
                            dbRefControlCOMP.set(0);
                            compLight.style.backgroundColor = "red";
                            alert(" L2 Error - Comp and Pump stop");
                        }

                        if (ControlAutoValue == 1 && val == 0 && isErrorL2 == true) {

                            dbRefControlPUMP.set(1);
                            localStorage.setItem("isErrorL2", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "L3") {
            dbRefMonitor.child("3phase_fault").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();
                        let isErrorL3 = JSON.parse(localStorage.getItem("isErrorL3"));

                        if (val == 1) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                                pumpOffField.checked = true;
                            }
                            localStorage.setItem("isErrorL3", true)

                            dbRefControlPUMP.set(0);
                            dbRefControlCOMP.set(0);
                            compLight.style.backgroundColor = "red";
                            alert(" L3 Error - Comp and Pump stop");
                        }

                        if (ControlAutoValue == 1 && val == 0 && isErrorL3 == true) {

                            dbRefControlPUMP.set(1);
                            localStorage.setItem("isErrorL3", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "WARN_LIQUID_TEMP_LOW") {
          
            dbRefMonitor.child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();
                        let isErrorLLT = JSON.parse(localStorage.getItem("isErrorLLT"));
                        // co loi tat COMP
                        if (val == 0) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                            }
                            localStorage.setItem("isErrorLLT", true)
                            compLight.style.backgroundColor = "red";
                            dbRefControlCOMP.set(0);

                           
                        }
                        // da sua loi bat COMP
                        if (ControlAutoValue == 1 && val == 1 && isErrorLLT == true) {

                            dbRefControlCOMP.set(1);
                            localStorage.setItem("isErrorLLT", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "LP") {
            // console.log("ErrorLP", variable)
            dbRefMonitor.child("statusF").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();
                        let isErrorLP = JSON.parse(localStorage.getItem("isErrorLP"));
                        // co loi tat COMP
                        if (val == 0) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                            }
                            localStorage.setItem("isErrorLP", true)
                            compLight.style.backgroundColor = "red";
                            dbRefControlCOMP.set(0);

                            alert(" Low Pressure Error - Comp stop");
                        }
                        // da sua loi bat COMP
                        if (ControlAutoValue == 1 && val == 1 && isErrorLP == true) {

                            dbRefControlCOMP.set(1);
                            localStorage.setItem("isErrorLP", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "HP") {
            // console.log("ErrorHP", variable)
            dbRefMonitor.child("statusF").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();

                        let isErrorHP = JSON.parse(localStorage.getItem("isErrorHP"));
                        // co loi tat COMP
                        if (val == 0) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                            }
                            localStorage.setItem("isErrorHP", true)
                            compLight.style.backgroundColor = "red";
                            dbRefControlCOMP.set(0);

                            alert("High Pressure Error - Comp stop");
                        }
                        // da sua loi bat COMP
                        if (ControlAutoValue == 1 && val == 1 && isErrorHP == true) {

                            dbRefControlCOMP.set(1);
                            localStorage.setItem("isErrorHP", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else if (variable == "CO") {
            // console.log("ErrorCO", variable)
            dbRefMonitor.child("statusF").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();

                        let isErrorCO = JSON.parse(localStorage.getItem("isErrorCO"));
                        // co loi tat COMP
                        if (val == 0) {

                            if (ControlManualValue == 1) {
                                compOffField.checked = true;
                            }
                            localStorage.setItem("isErrorCO", true)
                            compLight.style.backgroundColor = "red";
                            dbRefControlCOMP.set(0);

                            alert("Comp OverLoad Error - Comp stop");
                        }
                        // da sua loi bat COMP
                        if (ControlAutoValue == 1 && val == 1 && isErrorCO == true) {
                            

                            dbRefControlCOMP.set(1);
                            localStorage.setItem("isErrorCO", false)
                            changeOperating();
                        }
                    });
                });
            });
        }
        else {
            dbRefMonitor.child("statusF").child(variable).child("data").on("value", (snap) => {
                const val = snap.val();
                dbRefControlAuto.on("value", function (snapshot) {
                    var ControlAutoValue = snapshot.val();

                    dbRefControlManual.on("value", function (snapshot) {
                        var ControlManualValue = snapshot.val();

                        let isErrorPO = JSON.parse(localStorage.getItem("isErrorPO"));

                        // co loi PO
                        if (val == 0) {

                            if (ControlManualValue == 1) {
                                pumpOffField.checked = true;
                            }
                            localStorage.setItem("isErrorPO", true)
                            dbRefControlPUMP.set(0);
                            // dbRefMonitorPUMP.set(0);

                            // document.querySelector('input[name="options"][id="Off"]').checked = true;
                            alert("Pump OverLoad Error - Pump stop");
                        }
                        // da sua loi o che do Control Auto
                        if (ControlAutoValue == 1 && val == 1 && isErrorPO == true) {
                            // dbRefMonitorPUMP.set(1);                        
                            dbRefControlPUMP.set(1);
                            localStorage.setItem("isErrorPO", false);
                            changeOperating();
                        }
                    })
                });
            })
        }
    });

}


// Khởi tạo tham chiếu Firebase
const dbRefAutoTaplo = firebase.database().ref("monitor/MODE/AUTO_TAPLO/data");
const dbRefManualTaplo = firebase.database().ref("monitor/MODE/MANUAL_TAPLO/data");
const dbRefBientam = firebase.database().ref("control/BIENTAM");

// Hàm cập nhật biến control/BIENTAM lên 1
const updateBientam = () => {
    dbRefBientam.set(1, (error) => {
        if (error) {
            console.error("Error updating BIENTAM:", error);
        } else {
            console.log("BIENTAM updated successfully to 1");
        }
    });
};


// Gọi hàm updateBientam để cập nhật BIENTAM lên 1 (khi cần)
updateBientam();


// Lắng nghe sự thay đổi của AUTO_TAPLO/data (1)
dbRefAutoTaplo.on("value", (snapshot) => {
    const val = snapshot.val();
    if (val != 0) {
        updateBientam();
    }
});

// Lắng nghe sự thay đổi của MANUAL_TAPLO/data (2)
dbRefManualTaplo.on("value", (snapshot) => {
    const val = snapshot.val();
    if (val != 0) {
        updateBientam();
    }
});


function triggerColor(selector, val, mess) {
    if (val != document.querySelector(selector).innerHTML) {
        document.querySelector(selector).innerHTML = `${mess}: ${val}`;
        document.querySelector(selector).parentNode.style.background = "linear-gradient(to bottom , blue, purple)";
    }
    setTimeout(() => {
        document.querySelector(selector).parentNode.style.background = "linear-gradient(to bottom , green, purple)";
    }, 2000);
}

let prevTempState = null; // Biến để lưu trữ trạng thái trước đó của nhiệt độ
let setpoint1 = null;
// Lắng nghe thay đổi giá trị setpoint từ Firebase
dbRefControl.child("setpoint").on("value", (snap) => {
    setpoint1 = snap.val(); // Cập nhật giá trị setpoint từ snapshot
});

// Lắng nghe thay đổi nhiệt độ từ Firebase
dbRefMonitor.child("temp").child("tank").child("data").on("value", (snap) => {
    const val = snap.val(); // Lấy giá trị dữ liệu từ snapshot
    const temperature = `${val} &#8451;`; // Kết hợp giá trị nhiệt độ và đơn vị
    triggerColor("#Temp", temperature, "Temp"); // Gọi hàm triggerColor với giá trị nhiệt độ đã kết hợp
    // Kiểm tra nếu setpoint đã được cập nhật
    if (setpoint1 !== null) {
        // So sánh nhiệt độ với setpoint
        if (val > setpoint1 - 2) {
            if (prevTempState !== "above") {
                prevTempState = "above";
                changeOperating(); // Gọi hàm changeOperating khi nhiệt độ vượt qua setpoint
            }
        } else if (val < setpoint1 - 2) {
            if (prevTempState !== "below") {
                prevTempState = "below";
                changeOperating(); // Gọi hàm changeOperating khi nhiệt độ xuống dưới setpoint
            }
        }
    }
});


// setpoint
document.getElementById("setpoint").addEventListener("change", function () {

    var setpointValue = this.value;

    sendSetpointToFirebase(setpointValue);
});
function sendSetpointToFirebase(value) {
    if (value >= 5 && value <= 30) {
        var dbRef = firebase.database().ref("control/setpoint");
        dbRef.set(value)

    } else {
        // Nếu giá trị không hợp lệ, thông báo cho người dùng và không gửi giá trị xuống Firebase
        alert("Vui lòng nhập giá trị setpoint trong khoảng từ 5 đến 30");
    }
}

var dbRef = firebase.database().ref("control/setpoint");
dbRef.on("value", function (snapshot) {

    var setpointValue = snapshot.val();

    document.getElementById("setpoint").value = setpointValue;
});

let timeoutId;
document.getElementById("setpoint").addEventListener("input", function () {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
        changeOperating();
    }, 1000);
});

document.getElementById("Temp").addEventListener("change", changeOperating);

// setThighalarm
document.getElementById("setThighalarm").addEventListener("change", function () {

    var setThighalarmValue = this.value;

    sendSetThighalarmToFirebase(setThighalarmValue);
});

function sendSetThighalarmToFirebase(value) {
    if (value >= 0 && value <= 99) {
        var dbRef = firebase.database().ref("control/setThighalarm");
        dbRef.set(value)

    } else {
        // Nếu giá trị không hợp lệ, thông báo cho người dùng và không gửi giá trị xuống Firebase
        alert("Vui lòng nhập giá trị setThighalarm trong khoảng từ 0 đến 99");
    }
}

var dbRef = firebase.database().ref("control/setThighalarm");
dbRef.on("value", function (snapshot) {

    var setThighalarmValue = snapshot.val();

    document.getElementById("setThighalarm").value = setThighalarmValue;
});

document.getElementById("setThighalarm").addEventListener("input", function () {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
        // changeOperating();
    }, 1000);
});


// setThighwarn
document.getElementById("setThighwarn").addEventListener("change", function () {

    var setThighwarnValue = this.value;

    sendSetThighwarnToFirebase(setThighwarnValue);
});

function sendSetThighwarnToFirebase(value) {
    if (value >= 0 && value <= 99) {
        var dbRef = firebase.database().ref("control/setThighwarn");
        dbRef.set(value)

    } else {
        // Nếu giá trị không hợp lệ, thông báo cho người dùng và không gửi giá trị xuống Firebase
        alert("Vui lòng nhập giá trị setThighwarn trong khoảng từ 0 đến 99");
    }
}

var dbRef = firebase.database().ref("control/setThighwarn");
dbRef.on("value", function (snapshot) {

    var setThighwarnValue = snapshot.val();

    document.getElementById("setThighwarn").value = setThighwarnValue;
});

document.getElementById("setThighwarn").addEventListener("input", function () {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
        // changeOperating();
    }, 1000);
});


// setTlow
document.getElementById("setTlow").addEventListener("change", function () {
    var setTlowValue = this.value;
    sendSetTlowToFirebase(setTlowValue);
});

function sendSetTlowToFirebase(value) {
    if (value >= -40 && value <= 99) {
        var dbRef = firebase.database().ref("control/setTlow");
        dbRef.set(value)

    } else {
        // Nếu giá trị không hợp lệ, thông báo cho người dùng và không gửi giá trị xuống Firebase
        alert("Vui lòng nhập giá trị setTlow trong khoảng từ -40 đến 99");
    }
}

var dbRef = firebase.database().ref("control/setTlow");
dbRef.on("value", function (snapshot) {
    var setTlowValue = snapshot.val();
    document.getElementById("setTlow").value = setTlowValue;
});

document.getElementById("setTlow").addEventListener("input", function () {
    // Clear the previous timeout (if any)
    clearTimeout(timeoutId);
    // Set a new timeout
    timeoutId = setTimeout(() => {
        // changeOperating();
    }, 1000);
});

// Function to toggle color of a light between specified color and gray
var flashInterval;

function toggleColor(light, color) {
    if (light.style.backgroundColor === color) {
        light.style.backgroundColor = "gray"; // Change to gray if currently colored
    } else {
        light.style.backgroundColor = color; // Change to specified color if currently gray
    }
}

// Monitor ALARM_LIQUID_TEMP_HIGH data
firebase.database().ref("monitor/ALARM_LIQUID_TEMP_HIGH/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightAlarmLTH = document.getElementById("lightAlarmLTH");
    // Check the data from Firebase and update the color for lightAlarmLTH
    if (data == 0) {
        alert("!!! High Liquid Temp  Alarm ");
        // Flash the light by toggling color every 500 milliseconds (0.5 seconds)
        flashInterval = setInterval(function () {
            toggleColor(lightAlarmLTH, "red"); // Toggle to red
        }, 500);
    } else {
        clearInterval(flashInterval);
        lightAlarmLTH.style.backgroundColor = "gray";
    }
});

// Monitor WARN_LIQUID_TEMP_HIGH data
firebase.database().ref("monitor/WARN_LIQUID_TEMP_HIGH/data").on("value", function (snapshot) {
    var lightWarnLTH = document.getElementById("lightWarnLTH");
    var data = snapshot.val();
    if (data == 0) {
        alert("!!! High Liquid Temp Warn");
        flashInterval = setInterval(function () {
            toggleColor(lightWarnLTH, "yellow"); // Toggle to yellow
        }, 500);
    } else {
        clearInterval(flashInterval);
        lightWarnLTH.style.backgroundColor = "gray";      
    }
});

// Monitor WARN_LIQUID_TEMP_LOW data
firebase.database().ref("monitor/WARN_LIQUID_TEMP_LOW/data").on("value", function (snapshot) {
    var lightWarnLTL = document.getElementById("lightWarnLTL");
    var data = snapshot.val();
    if (data == 0) {
        alert("!!! Alarm Liquid Temp Low ");
        flashInterval = setInterval(function () {
            toggleColor(lightWarnLTL, "red"); // Toggle to yellow
        }, 500);
    } else {
        clearInterval(flashInterval);
        lightWarnLTL.style.backgroundColor = "gray";    
    }
});


var setpointField = document.getElementById("setpoint");
var setpoint = parseFloat(setpointField.value);
var compLight = document.getElementById("light1");
var pumpLight = document.getElementById("light2");
var pumpOnField = document.getElementById("pumpOn");
var pumpOffField = document.getElementById("pumpOff");
var compOnField = document.getElementById("compOn");
var compOffField = document.getElementById("compOff");
var compOn = compOnField.checked;
var pumpOn = pumpOnField.checked;

firebase.database().ref("control/BIENTAM").on("value", function (snapshot) {
    var offValue = snapshot.val();
    // Kiểm tra nếu giá trị "Off" được gửi lên
    if (offValue == 1) {
        // Đặt các biến AUTO, MANUAL, buttonCOMP, và buttonPUMP về 0   
        compOnField.checked = false;
        pumpOnField.checked = false;
        compOffField.checked = false;
        pumpOffField.checked = false;
        clearInterval(flashInterval);
        clearTimeout(lightCompTimeout)
        clearTimeout(autoTimeout)
        clearTimeout(CompAutoTimeout)
        // Lắng nghe sự thay đổi của biến AUTO trên Firebase
        let dbRefAuto2 = firebase.database().ref("monitor/MODE/AUTO/data");
        dbRefAuto2.on("value", function (snapshot) {

            var autoValue = snapshot.val();

            if (autoValue == 1) {
                document.getElementById("lightAuto").style.backgroundColor = "green"; // Chuyển sang màu đỏ
            } else {
                document.getElementById("lightAuto").style.backgroundColor = "red"; // Chuyển sang màu xám (trạng thái ban đầu)
            }
        });
        // Lắng nghe sự thay đổi của biến AUTO từ địa chỉ control/mode/AUTO

        let dbRefAutoControl = firebase.database().ref("control/mode/AUTO");
        dbRefAutoControl.on("value", function (snapshot) {
            // Lấy giá trị của biến AUTO từ snapshot
            var controlAutoValue = snapshot.val();
            // Cập nhật giao diện web dựa trên giá trị của biến AUTO
            if (controlAutoValue == 1) {
                document.getElementById("lightAuto").style.backgroundColor = "green"; // Chuyển sang màu xanh dương
            } else {
                document.getElementById("lightAuto").style.backgroundColor = "red"; // Chuyển sang màu xám
            }
        });
        // Lắng nghe sự thay đổi của biến MANUAL trên Firebase
        let dbRefManual2 = firebase.database().ref("monitor/MODE/MANUAL/data");
        dbRefManual2.on("value", function (snapshot) {
            // Lấy giá trị của biến MANUAL từ snapshot
            var manualValue = snapshot.val();
            // Cập nhật giao diện web dựa trên giá trị của biến MANUAL
            if (manualValue == 1) {
                document.getElementById("lightManual").style.backgroundColor = "green"; // Chuyển sang màu đỏ
            } else {
                document.getElementById("lightManual").style.backgroundColor = "red"; // Chuyển sang màu xám (trạng thái ban đầu)
            }
        });
        //  // Lắng nghe sự thay đổi của biến MANUAL từ địa chỉ control/mode/MANUAL
        let dbRefManualControl = firebase.database().ref("control/mode/MANUAL");
        dbRefManualControl.on("value", function (snapshot) {
            // Lấy giá trị của biến MANUAL từ snapshot
            var controlManualValue = snapshot.val();
            // Cập nhật giao diện web dựa trên giá trị của biến MANUAL
            if (controlManualValue == 1) {
                document.getElementById("lightManual").style.backgroundColor = "green"; // Chuyển sang màu xanh dương
            } else {
                document.getElementById("lightManual").style.backgroundColor = "red"; // Chuyển sang màu xám
            }
        });

        firebase.database().ref("control/mode/AUTO").set(0);
        firebase.database().ref("control/mode/MANUAL").set(0);
        firebase.database().ref("control/mode/buttonCOMP").set(0);
        firebase.database().ref("control/mode/buttonPUMP").set(0);
        pumpLight.style.backgroundColor = "red";
        compLight.style.backgroundColor = "red";
        setTimeout(function () {
            if (!compOn && !pumpOn) {
                // Khi cả comp và pump đều off
                img1.src = WEB_IMAGE;
            } else if (compOn && !pumpOn) {
                // Khi chỉ comp on và pump off
                img1.src = COMP_IMAGE;
            } else if (!compOn && pumpOn) {
                // Khi chỉ pump on và comp off
                img1.src = PUMP_IMAGE;
            } else if (compOn && pumpOn) {
                // Khi cả comp và pump đều on
                img1.src = COMP_PUMP_IMAGE;
            }
        }
            , 1000)
    };

});

// var flashIntervalHP;
// var flashIntervalLP;
// var flashIntervalPO;
// var flashIntervalCO;
// var flashIntervalL1;
// var flashIntervalL2;
// var flashIntervalL3;

// hàm các lỗi

// HP
firebase.database().ref("monitor/statusF/HP/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightHP = document.getElementById("lightHP");
    if (data == 0) {
        // flashIntervalHP = setInterval(function () {
        //     toggleColor(lightHP, "red"); // Toggle to red
        // }, 500);
        lightHP.style.backgroundColor = "red";
    } else {
        // clearInterval(flashIntervalHP);
        lightHP.style.backgroundColor = "gray";
    }
    checkfault();
});

// Monitor ALARM_LIQUID_TEMP_LOW data for LP
firebase.database().ref("monitor/statusF/LP/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightLP = document.getElementById("lightLP");
    if (data == 0) {
        // flashIntervalLP = setInterval(function () {
        //     toggleColor(lightLP, "red"); // Toggle to red
        lightLP.style.backgroundColor = "red";
        // }, 500);
    } else {
        // clearInterval(flashIntervalLP);
        lightLP.style.backgroundColor = "gray";
    }
});

// Monitor ALARM_PRESSURE_OVERLOAD data for PO
firebase.database().ref("monitor/statusF/PO/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightPO = document.getElementById("lightPO");
    if (data == 0) {
        // flashIntervalPO = setInterval(function () {
        //     toggleColor(lightPO, "red"); // Toggle to red
        // }, 500);
        lightPO.style.backgroundColor = "red";
    } else {
        // clearInterval(flashIntervalPO);
        lightPO.style.backgroundColor = "gray";
    }
});

// Monitor ALARM_CO2_LEVEL data for CO
firebase.database().ref("monitor/statusF/CO/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightCO = document.getElementById("lightCO");
    if (data == 0) {
        // flashIntervalCO = setInterval(function () {
        //     toggleColor(lightCO, "red"); // Toggle to red
        // }, 500);
        lightCO.style.backgroundColor = "red";
    } else {
        // clearInterval(flashIntervalCO);
        lightCO.style.backgroundColor = "gray";
    }
});

// Monitor ALARM_LEVEL1 data for L1
firebase.database().ref("monitor/3phase_fault/L1/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightL1 = document.getElementById("lightL1");
    if (data == 1) {
        // flashIntervalL1 = setInterval(function () {
        //     toggleColor(lightL1, "red"); // Toggle to red
        // }, 500);
        lightL1.style.backgroundColor = "red";
    } else {
        // clearInterval(flashIntervalL1);
        lightL1.style.backgroundColor = "gray";
    }
});

// Monitor ALARM_LEVEL2 data for L2
firebase.database().ref("monitor/3phase_fault/L2/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightL2 = document.getElementById("lightL2");
    if (data == 1) {
        // flashIntervalL2 = setInterval(function () {
        //     toggleColor(lightL2, "red"); // Toggle to red
        // }, 500);
        lightL2.style.backgroundColor = "red";
    } else {
        // clearInterval(flashIntervalL2);
        lightL2.style.backgroundColor = "gray";
    }
});

// Monitor ALARM_LEVEL3 data for L3
firebase.database().ref("monitor/3phase_fault/L3/data").on("value", function (snapshot) {
    var data = snapshot.val();
    var lightL3 = document.getElementById("lightL3");
    if (data == 1) {
        // flashIntervalL3 = setInterval(function () {
        //     toggleColor(lightL3, "red"); // Toggle to red
        // }, 500);
        lightL3.style.backgroundColor = "red";
    } else {
        // clearInterval(flashIntervalL3);
        lightL3.style.backgroundColor = "gray";
    }
});


let dbRefMonitorCOMP = firebase.database().ref("monitor/COMP/data");
let dbRefMonitorPUMP = firebase.database().ref("monitor/PUMP/data");
let dbRefMonitorAuto = firebase.database().ref("monitor/MODE/AUTO/data");
dbRefMonitorAuto.on("value", function (snapshot) {
    var MonitorAutoValue = snapshot.val();
    if (MonitorAutoValue == 1) {
        // dbRefMonitorManual.set(0);
        // dbRefMonitorCOMP.set(0);
        // dbRefMonitorPUMP.set(0);
    }
});

let dbRefMonitorManual = firebase.database().ref("monitor/MODE/MANUAL/data");
dbRefMonitorManual.on("value", function (snapshot) {
    // Lấy giá trị của biến MANUAL từ snapshot
    var MonitorManualValue = snapshot.val();
    // Cập nhật giao diện web dựa trên giá trị của biến MANUAL
    if (MonitorManualValue == 1) {
        // dbRefMonitorCOMP.set(0);
        // dbRefMonitorPUMP.set(0);
        // dbRefMonitorAuto.set(0);
    }
});


//-----------------------------------BANG GIAI THICH CHO HLT, LLT------------------------------------------------------------

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


// document.addEventListener('DOMContentLoaded', function() {
//     const lights = document.querySelectorAll('.light b');
//     const tooltip = document.getElementById('tooltip');
    
//     lights.forEach(light => {
//         light.addEventListener('mouseover', function(event) {
//             const text = event.target.innerText.trim();
//             console.log("test", text)
//             let explanation = '';
            
//             switch(text) {
//                 case 'HLT':
//                     console.log("HLT")
//                     explanation = 'Nhiệt độ mức cao (High-Level Temperature)';
//                     break;
//                 case 'LLT':
//                     console.log("LLT")
//                     explanation = 'Nhiệt độ mức thấp (Low-Level Temperature)';
//                     break;
//                 default:
//                     // explanation = 'Chữ viết tắt không xác định';
//             }
            
//             tooltip.innerText = explanation;
//             tooltip.style.display = 'block';

//             // Tính toán vị trí của tooltip
//             const rect = event.target.getBoundingClientRect();
//             tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
//             tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
//         });

//         light.addEventListener('mouseout', function() {
//             tooltip.style.display = 'none';
//         });
//     });
// });

