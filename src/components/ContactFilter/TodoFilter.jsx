import './TodoFilter.scss';

const TodoFilter = ({ value, onChange }) => (
  <div className="TodoFilter">
    <label className="TodoFilter__label">
      Filter
      <input
        className="TodoFilter__textarea"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

export default TodoFilter;
