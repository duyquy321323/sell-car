import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

function LocationPicker({ onSelect }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onSelect({ lat, lng });
        },
    });
    return null;
}

export default function MyMap(props) {// Ban đầu chưa có vị trí

    const { position, setPosition, className, onChange } = props;

    // Lấy tọa độ hiện tại
    useEffect(() => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    onChange(`${latitude + "," + longitude}`);
                    setPosition({ lat: latitude, lng: longitude });
                },
                (err) => {
                    if (err.code === 1) {
                        alert("Trình duyệt đã chặn quyền truy cập vị trí. Vui lòng cho phép lại trong cài đặt trình duyệt.");
                    }
                    setPosition({ lat: 10.762622, lng: 106.660172 }); // fallback
                }
            );

    }, []);

    if (!position || !position?.lat) return <div>Đang lấy vị trí hiện tại...</div>;

    return (
        <div className={"h-[500px] max-xl:h-96 max-lg:h-64 max-sm:h-52 w-full " + className}>
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full rounded-md"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker onSelect={(e) => {setPosition(e); onChange(`${e.lat + "," + e.lng}`);}} />
                <Marker position={position} />
            </MapContainer>
        </div>
    );
}
