const statusDisplay = document.getElementById('status');


const socket = new WebSocket('ws://95.182.122.140:5000/send-location')

socket.onopen = () => {
    console.log('Соединение с send-location установлено');
    statusDisplay.innerText = 'Соединение установлено. Отправка геолокации...';

    // Проверяем доступность геолокации и запускаем отправку каждые 1 секунду
    if (navigator.geolocation) {
        locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        timestamp: position.timestamp
                    };

                    // Отправляем данные на сервер, если WebSocket открыт
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(locationData));
                        console.log('Отправлены данные геолокации:', locationData);
                    }
                },
                (error) => {
                    console.error('Ошибка получения геолокации:', error);
                    statusDisplay.innerText = 'Не удалось получить геолокацию.';
                }
            );
        }, 1000);
    } else {
        statusDisplay.innerText = 'Геолокация не поддерживается вашим устройством.';
    }
}