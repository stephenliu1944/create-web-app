import styles from './mainLayout.css';
import Header from 'Components/header/Header';
import Footer from 'Components/footer/Footer';
/**
 * @desc 页面整体框架组件
 */
export default function MainLayout(Component) {
 
    return `
        <div className=${styles.layout}>
            ${ Header() }
            <div className=${styles.container}>
                ${ Component() }
            </div>
            ${ Footer() }
        </div>
    `;
}
