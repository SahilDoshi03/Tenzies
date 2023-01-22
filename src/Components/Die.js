import './css/Die.css'

export default function Die(props){

    const styles = {
        backgroundColor: props.isHeld? "#59E391" : "#FFFFFF"
    }
    return(
        <div 
            className='dice' style={styles} 
            onClick={props.hold}
        >
            <span className="number">{props.value}</span>
        </div>
    )
}