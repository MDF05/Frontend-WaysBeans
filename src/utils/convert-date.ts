export default function calcAgePost(date: string) {
    const postDate = new Date(date);
    const today = new Date();
    const diffTime = today.getTime() - postDate.getTime();
    const convertDay = Math.floor(diffTime / 1000 / 60 / 60 / 24);
    const convertHour = Math.floor(diffTime / 1000 / 60 / 60);
    const convertMinute = Math.floor(diffTime / 1000 / 60);
    const convertSecond = Math.floor(diffTime / 1000);
    if (convertDay > 0) return `${convertDay}d`;
    else if (convertHour > 0) return `${convertHour}h`;
    else if (convertMinute > 0) return `${convertMinute}m`;
    else if (convertSecond > 0) return `${convertSecond}s`;
    else return "just now";
}
