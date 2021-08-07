import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from "geolib/es/getCenter";
import Image from 'next/image';

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the search  results object into the 
    // {latitude: hvs, longitude:vshbl}

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/sameem-baba/cks22rjp45c0917o5bz3sobsu"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextVeiwport) => setViewport(nextVeiwport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-pulse"
                            aria-label="push-pin"
                        >
                            📌
                        </p>
                    </Marker>

                    {/* THIS IS THE POPUP WE SHOULD SEE ON A */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            <div className="flex cursor-pointer items-start">
                                <div className="relative h-40 w-40">
                                    <Image src={result.img} layout='fill' objectFit='cover'/>
                                </div>
                                <div className="space-y-5 pl-2">
                                    <h4>{result.title}</h4>
                                    <p>{result.description}</p>
                                </div>
                            </div>
                        </Popup>
                    ): (
                            false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map;
