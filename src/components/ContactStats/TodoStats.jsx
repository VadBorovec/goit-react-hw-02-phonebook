import './TodoStats.scss';

const TodoStats = ({ totalTodoCount, completedTodoCount }) => (
  <div className="TodoStats__wrap">
    <p className="TodoStats__text">Total amount: {totalTodoCount}</p>
    <p className="TodoStats__text">Number of completed: {completedTodoCount}</p>
  </div>
);

export default TodoStats;
