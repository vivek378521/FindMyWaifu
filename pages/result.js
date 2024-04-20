import { useRouter } from 'next/router';
import styles from '../styles/Result.module.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function Result() {
    const router = useRouter();
    const { randomResult } = router.query;
    const { width, height } = useWindowSize();

    if (!randomResult) {
        return <div>Loading...</div>;
    }

    const parsedResult = JSON.parse(randomResult);

    return (
        <div className={styles.container}>
            <Confetti
                width={width}
                height={height}
                numberOfPieces={300}
                recycle={false}
            />
            <h2 className={styles.title}>Your Waifu is {parsedResult.character.full_name}</h2>
            <div className={styles.imageContainer}>
                <img
                    src={parsedResult.character.image_url}
                    alt={parsedResult.character.full_name}
                    className={styles.image}
                />
            </div>
            <button onClick={() => router.back()} className={styles.button}>
                Go Back
            </button>
        </div>
    );
}