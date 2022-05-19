import { useState } from "react";

const TopPictures = ({ pictures }) => {
    const [howMany, setHowMany] = useState(0);

    const handleFormSubmitted = (event) => {
        let rankingCount = event.target.firstN.value.trim() !== "" ? event.target.firstN.value : null;
        if (rankingCount == null) {
            event.preventDefault();
            setHowMany(0);
            return;
        }
        setHowMany(rankingCount);
        console.log(`Displaying first ${rankingCount} pictures ordered by votes`);
        event.preventDefault();
    }

    return (
        <>
            <form
                style={{ marginBottom: "75px" }}
                onSubmit={(event) => handleFormSubmitted(event)}>
                <input id="firstN" type="number"/>
                <input type="submit" value="Search"/>
            </form>
            <div>
                {pictures.slice(0, howMany)}
            </div>
        </>
    )
}

export default TopPictures;