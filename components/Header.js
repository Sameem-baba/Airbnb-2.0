import Image from "next/image";
import {
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter();


    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests
            }
        });
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput("");
    }

    return (
        <header className="sticky top-0 z-50 grid
        grid-cols-3 bg-[#444444] shadow-md p-5 md:px-10">
            {/* Left */}
            <div
                onClick={() => router.push('/')}
                className="relative flex items-center 
                h-10 cursor-pointer my-auto"
            >
                <Image
                    src='https://links.papareact.com/qd3'
                    layout='fill'
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Center */}
            <div className="flex items-center md:border-2 rounded-full
            py-2 md:shadow-sm">
                <input
                    className="flex-grow pl-5 bg-transparent 
                    outline-none text-sm text-white
                    placeholder-gray-400"
                    type="text"
                    placeholder={placeholder || "Start your Search"} 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon
                    className="hidden md:inline-flex h-8
                    bg-red-400 text-white
                    rounded-full p-2 cursor-pointer md:mx-2"
                />
            </div>

            {/* Right */}
            <div
                className="flex items-center justify-end
                space-x-4 text-white">
                <p className="hidden md:inline cursor-pointer">
                    Become a host
                </p>
                <GlobeAltIcon className="h-6 " />
                
                <div
                    className="flex border-2 rounded-full 
                    items-center space-x-2 p-2"
                >
                    <MenuIcon className="h-6 cursor-pointer"/>
                    <UserCircleIcon className="h-6 cursor-pointer"/>
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col bg-white col-span-3 mx-auto mt-5">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center bg-white border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>
                        <UsersIcon className="h-5" />
                        <input
                            value={noOfGuests}
                            onChange={(e) => setNoOfGuests(e)}
                            min={1}
                            type="number"
                            className="w-12 pl-2 text-lg outline-none
                          text-red-400"
                        />
                    </div>
                    <div className="flex bg-white">
                        <button className="flex-grow text-gray-500" onClick={resetInput}>
                            Cancel
                        </button>
                        <button onClick={search} className="flex-grow text-red-400">
                            Search
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
