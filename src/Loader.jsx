import './Loader.css'

const Loader = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large',
  }

  const loader = <div className={`loader ${sizeClasses[size]}`}></div>

  if (fullScreen) {
    return <div className="loader-screen">{loader}</div>
  }

  return loader
}

export default Loader
