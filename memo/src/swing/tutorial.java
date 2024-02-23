package swing;

import java.awt.BorderLayout;

import javax.swing.*;

public class tutorial {
	public static void main (String args[]) {
		JFrame frame = new JFrame("My First GUI");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(300, 300);
		
		// �޴� �� ---------------------
		JMenuBar mb = new JMenuBar();
		JMenu m1 = new JMenu("FILE");
		JMenu m2 = new JMenu("Help");
		
		mb.add(m1);
		mb.add(m2);
		
		JMenuItem m11 = new JMenuItem("Open");
		JMenuItem m12 = new JMenuItem("Close");
		
		JMenuItem m21 = new JMenuItem("Save as");
		
		m1.add(m11);
		m1.add(m12);
		m2.add(m21);
		
		// �гΰ� ��ư ----------------------
		JPanel panel = new JPanel();
		JLabel label = new JLabel("Enter Text");
		JTextField tf = new JTextField(10);	// 10�ڱ��� ����
		
		JButton button = new JButton("Send");		
		JButton button2 = new JButton("Reset");
		
		panel.add(label);
		panel.add(tf);
		panel.add(button);
		panel.add(button2);
		
		// text area -----------------
		JTextArea ta = new JTextArea();
		
		
		// ��ư or ����Ű �̺�Ʈ ------------------
		
		
		button.addActionListener(e -> {
			String t = tf.getText();
			if (t.equals("") || t == "" || t == null || t.isEmpty()) {
				return;
			}
			ta.append(t + "\n");
			tf.setText("");
		});
		
		
		// �����ӿ� ������� �߰� �� ���̾ƿ�
		frame.getContentPane().add(BorderLayout.SOUTH, panel);
		frame.getContentPane().add(BorderLayout.NORTH, mb);
		frame.getContentPane().add(BorderLayout.CENTER, ta);
		

		frame.setVisible(true);
	}
}
