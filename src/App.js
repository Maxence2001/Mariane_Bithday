import React, { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import './App.css';

function App() {
    const [currentDate, setCurrentDate] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const { width, height } = useWindowSize();
    const today = new Date();
    const birthday = new Date();
    birthday.setMonth(3); // Avril
    birthday.setDate(26);

    // Si la date est déjà passée cette année, viser l'année prochaine
    if (today > birthday) {
        birthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = birthday - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // ➔ Calculé avant !

    const audioRef = useRef(null);

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        setCurrentDate(formattedDate);


        if (diffDays === 0) {
            setBackgroundImage('https://media1.tenor.com/m/RSc9Gw10HnsAAAAd/shrek-smirk-shrek-sus.gif');
        } else {
            setBackgroundImage('https://i.pinimg.com/originals/66/37/f4/6637f4a6c16d1c65686b8a77f82d0a4e.gif');
        }

        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.play().catch(error => {
                    console.log('Audio play error:', error);
                });
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            } else {
                if (audioRef.current) {
                    audioRef.current.play().catch(error => {
                        console.log('Audio play error:', error);
                    });
                }
            }
        };

        window.addEventListener('click', playAudio);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('click', playAudio);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [diffDays]); // ATTENTION ici aussi ➔ il faut écouter diffDays, pas isBirthday !

    return ( <
        div className = "App"
        style = {
            { backgroundImage: `url(${backgroundImage})` } } >
        <
        Confetti width = { width }
        height = { height }
        /> <
        div className = "date-time" > { currentDate } < /div> {
            diffDays === 0 ? ( <
                h1 className = "birthday-message" > Happy Birthday! < /h1>
            ) : ( <
                h1 className = "birthday-message" > Il reste { diffDays }
                jours avant le 26 avril! < /h1>
            )
        } <
        audio ref = { audioRef }
        autoPlay hidden muted >
        <
        source src = { diffDays === 0 ? "/Shrek_Rizz.mp3" : "/What_Do_You_Mean_Lyrics.mp3" }
        type = "audio/mp3" / >
        Ton navigateur ne prend pas en charge les balises audio. <
        /audio> <
        /div>
    );
}

export default App;