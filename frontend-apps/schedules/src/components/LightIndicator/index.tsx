const LightIndicator = ({ on }: { on: boolean }) => {
    return (
        <div
            style={{
                height: 10,
                width: 10,
                backgroundColor: on ? 'green' : 'red',
                borderRadius: '50%',
            }}
        />
    );
};

export default LightIndicator;
