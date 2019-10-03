import React, { useState, useMemo } from 'react';
import api from '../../services/api'
import camera from '../../assets/camera.svg';

import styles from './styles.css';

export default function New(history) {
	const [company, setCompany] = useState('');
	const [techs, setTechs] = useState('');
	const [price, setPrice] = useState('');
	const [thumbnail, setThumbnail] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail]);

	async function handleSubmit (event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id}
        });

        history.push('/dashboard');
	}

	return (
		<form onSubmit={handleSubmit}>
            <label id="thumbnail" 
                   style={{ backgroundImage: `url(${preview})`}}
                   className={thumbnail ? 'has-thumbnail' : ''}>
				<input type="file" onChange={event => setThumbnail(event.target.files)}></input>
				<img src={camera} alt="Selecione a imagem"/>
			</label>

			<label htmlFor="company">Empresa</label>
			<input id="company"
				   placeholder="Sua empresa incrível"
				   value={company}
				   onChange={event => setCompany(event.target.value)}/>

			<label htmlFor="company">Tecnologias <span>Separadas por vírgula</span></label>
			<input id="techs"
				   placeholder="Quais tecnologias usam?"
				   value={techs}
				   onChange={event => setTechs(event.target.value)}/>

			<label htmlFor="company">Valor da diária <span>(Em branco para gratuiro)</span></label>
			<input id="techs"
				   placeholder="Valor da diária?"
				   value={price}
				   onChange={event => setPrice(event.target.value)}/>
			<button type="submit" className="btn">Cadastrar</button>
	   
		</form>
	)
}