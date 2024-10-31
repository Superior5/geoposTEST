const socket = new WebSocket('ws://192.168.0.102:5000/get-locations')


socket.onopen = () => {
    console.log('Соединение с get-locations установлено');
};

socket.onmessage = (event) => {
    console.log('Получено сообщение:', event.data);
    document.querySelector('.locationDisplay').innerText = `Полученные данные: ${event.data}`;
};